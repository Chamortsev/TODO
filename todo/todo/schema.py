import graphene
from graphene_django import DjangoObjectType
from users.models import User
from projects.models import Project


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)

    def resolve_all_users(root, info):
        return User.objects.all()

    all_projects = graphene.List(ProjectType)

    def resolve_all_projects(root, info):
        return Project.objects.all()


    user_by_id = graphene.Field(UserType, id=graphene.Int(required=True))

    def resolve_user_by_id(root, info, id):
        try:
            return User.objects.get(id=id)
        except User.DoesNotExist:
            return None

    user_by_name = graphene.List(UserType, first_name=graphene.String(required=False))

    def resolve_user_by_name(root, info, first_name=None):
        users = User.objects.all()
        if first_name:
            users = users.filter(first_name=first_name)
        return users


class UserCreateMutation(graphene.Mutation):
    class Arguments:
        first_name = graphene.String(required=True)
        last_name = graphene.String(required=True)


    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, first_name, last_name):
        user = User(first_name=first_name, last_name=last_name)
        user.save()
        return UserCreateMutation(user)


class UserUpdateMutation(graphene.Mutation):
    class Arguments:
        id = graphene.Int(required=True)
        first_name = graphene.String(required=False)
        last_name = graphene.String(required=False)

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, root, info, id, first_name=None, last_name=None):
        author = User.objects.get(id=id)
        if first_name:
            author.first_name = first_name
        if last_name:
            author.last_name = last_name
        if first_name or last_name:
            author.save()
        return UserUpdateMutation(author)


class Mutations(graphene.ObjectType):
    create_author = UserCreateMutation.Field()
    update_author = UserUpdateMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutations)