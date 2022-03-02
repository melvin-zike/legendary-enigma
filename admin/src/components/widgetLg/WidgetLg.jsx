import "./widgetLg.css";


export default function WidgetLg() {
    const Button = ({type}) =>{
        return <button className={"widgetLgButton " + type}>{type}</button>
    }

    return (
        <div className="widgetLg">
           <h3 className="widgetLgTitle">
               Latest Transactions
           </h3>
           <table className="widgetLgTable">
               <tbody>

               
                <tr className="widgetLgTr">
                    <th className="widgetLgTh">Customers</th>
                    <th className="widgetLgTh">Date</th>
                    <th className="widgetLgTh">Amount</th>
                    <th className="widgetLgTh">Status</th>
                    <th className="widgetLgTh">Subscription</th>
                </tr>
                <tr className="widgetLgTr">
                    <td className="widgetLgUser">
                       <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="" className="widgetLgImg" /> 
                       <span className="widgetLgName">Mazzy MArk</span>
                    </td>
                    <td className="widgetLgDate">2 Jun 2021</td>
                    <td className="widgetLgMoney">N60000</td>
                    <td className="widgetLgStatus">
                        <Button type="Approved" />
                    </td>
                </tr>
                <tr className="widgetLgTr">
                    <td className="widgetLgUser">
                       <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="" className="widgetLgImg" /> 
                       <span className="widgetLgName">Mazzy MArk</span>
                    </td>
                    <td className="widgetLgDate">2 Jun 2021</td>
                    <td className="widgetLgMoney">N60000</td>
                    <td className="widgetLgStatus">
                        <Button type="Declined" />
                    </td>
                </tr>
                <tr className="widgetLgTr">
                    <td className="widgetLgUser">
                       <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="" className="widgetLgImg" /> 
                       <span className="widgetLgName">Mazzy MArk</span>
                    </td>
                    <td className="widgetLgDate">2 Jun 2021</td>
                    <td className="widgetLgMoney">N60000</td>
                    <td className="widgetLgStatus">
                        <Button type="Approved" />
                    </td>
                </tr>
                <tr className="widgetLgTr">
                    <td className="widgetLgUser">
                       <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="" className="widgetLgImg" /> 
                       <span className="widgetLgName">Mazzy MArk</span>
                    </td>
                    <td className="widgetLgDate">2 Jun 2021</td>
                    <td className="widgetLgMoney">N60000</td>
                    <td className="widgetLgStatus">
                        <Button type="Approved" />
                    </td>
                </tr>
                <tr className="widgetLgTr">
                    <td className="widgetLgUser">
                       <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="" className="widgetLgImg" /> 
                       <span className="widgetLgName">Mazzy MArk</span>
                    </td>
                    <td className="widgetLgDate">2 Jun 2021</td>
                    <td className="widgetLgMoney">N60000</td>
                    <td className="widgetLgStatus">
                        <Button type="Pending" />
                    </td>
                </tr>
                </tbody>
           </table>
        </div>
    )
}
