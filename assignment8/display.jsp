<%@ page import="java.sql.*" %>

<html>
<head>
    <title>Display Records</title>
</head>
<body>

<h2>Student Records</h2>

<table border="1">
<tr>
    <th>ID</th>
    <th>Name</th>
    <th>Course</th>
    <th>Marks</th>
</tr>

<%
try{
    Class.forName("com.mysql.cj.jdbc.Driver");

    Connection con=DriverManager.getConnection(
        "jdbc:mysql://localhost:3306/college_db",
        "root",
        ""
    );

    Statement stmt=con.createStatement();
    ResultSet rs=stmt.executeQuery("SELECT * FROM students_info");

    while(rs.next()){
%>

<tr>
    <td><%= rs.getInt(1) %></td>
    <td><%= rs.getString(2) %></td>
    <td><%= rs.getString(3) %></td>
    <td><%= rs.getInt(4) %></td>
</tr>

<%
    }

    con.close();

}catch(Exception e){
    out.println(e);
}
%>

</table>

<br>
<form action="save.html" method="get">
    <input type="submit" value="Add New Record">
</form>
</body>
</html>