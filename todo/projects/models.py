from django.db import models
from users.models import User


class Project(models.Model):
    name = models.CharField(
        max_length=64,
        verbose_name='Название',
    )
    repository_url = models.URLField(
        verbose_name='Ссылка на проект',
    )
    users = models.ManyToManyField(
        User,
        verbose_name='Пользователь',
    )

    def __str__(self):
        users = ', '.join([str(el) for el in User.objects.filter(project__id=self.pk)])
        return f'{self.name} ({users})'

    class Meta:
        verbose_name = 'Проект'
        verbose_name_plural = 'Проекты'


class Todo(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        verbose_name='Проект',
    )
    user = models.ForeignKey(
        User,
        on_delete=models.RESTRICT,
        verbose_name='Владелец',
    )
    title = models.CharField(
        max_length=64,
        verbose_name='Название задачи',
    )
    text = models.TextField(
        verbose_name='Заметка',
    )
    is_active = models.BooleanField(
        verbose_name='Активна',
        default=True
    )
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'{self.title} ({self.project.name}) - {self.user.first_name}'

    class Meta:
        verbose_name = 'Заметка'
        verbose_name_plural = 'Заметки'
