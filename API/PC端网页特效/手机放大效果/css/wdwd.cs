public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Label1.Text = Rdnum(6);
    }

    string Rdnum(int n)//设计随机函数
    {
        string num = "";
        string[] myarry = { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", };
        Random rd = new Random();
        for (int i = 1; i < n + 1; i++)
        {
            int t = rd.Next(35);
            num += myarry[t];
        }
        return num;
    }

    protected void Button1_Click1(object sender, EventArgs e)
    {
Label1.Text = Rdnum(4);
    }
    protected void Button2_Click(object sender, EventArgs e)
    {
         if (TextBox1.Text.Trim() == "" || TextBox2.Text.Trim() == "")
        {
            Response.Write("<script>alert('用户名和密码不能为空!')</script>");
            return;
        }
        if (TextBox3.Text.Trim() != Label1.Text.Trim()) //若验证码输入错误
            Response.Write("<script>alert('你的验证码输入错误，请重输入!')</script>");
        else                            //若验证码输入正确
        {
            SqlConnection myconn = new SqlConnection();//实例化数据库连接对象
            string mystr;//声明字符串mystr
            mystr = "Data Source=.;Initial Catalog=bookshop;Integrated Security=True";//给字符串mystr赋值
            myconn.ConnectionString = mystr;//利用mystr字符串创建数据库连接对象
            myconn.Open();//打开数据库对象

            string mysql;//声明字符串mysql
            mysql = "select qx from user where 用户名='" + TextBox1.Text + "' and 密码='" + TextBox2.Text + "'";//给字符串mysql赋值
            SqlCommand mycmd = new SqlCommand(mysql, myconn);//连接数据库对象myconn执行mysql并将结果实例化给
            if (mycmd.ExecuteScalar()!=null)//判断结果是否不为空
            {
                Session["userID"] = TextBox1.Text.Trim();//保存会话对象
                if (mycmd.ExecuteScalar().ToString().Trim() == "管理员")//判断找到结果的身份导航到不同的网页
                { Server.Transfer("~/default5.aspx"); }//导航管理员网页
                else { Server.Transfer("~/gk.aspx"); }//导航买家网页
            }
            else
            {
                Response.Write("<script>alert('对不起，你输入的用户名/密码错误或者已无效，请查实!')</script>");
            }
            myconn.Close();
        }
    }
}