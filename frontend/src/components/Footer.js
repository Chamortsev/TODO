import React from 'react'

const FooterItem = ({footer}) => {
   return (
       <tr>
           <td>
               {footer.main}
           </td>
           <td>
               {footer.api}
           </td>
       </tr>
   )
}

const FooterList = ({footers}) => {
    return (
        <table>
            <th>
                Main
            </th>
            <th>
                Api
            </th>

            {footers.map((footer) => <FooterItem footer={footer} />)}
        </table>
    )
 }

export default FooterList
