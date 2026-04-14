<%@ page import="java.sql.*" %>

<%
String id=request.getParameter("id");
String name=request.getParameter("name");
String course=request.getParameter("course");
String marks=request.getParameter("marks");

try{
    Class.forName("com.mysql.cj.jdbc.Driver");

    Connection con=DriverManager.getConnection(
        "jdbc:mysql://localhost:3306/college_db",
        "root",
        ""
    );

    PreparedStatement ps=con.prepareStatement(
        "INSERT INTO students_info VALUES(?,?,?,?)"
    );

    ps.setInt(1,Integer.parseInt(id));
    ps.setString(2,name);
    ps.setString(3,course);
    ps.setInt(4,Integer.parseInt(marks));

    int i=ps.executeUpdate();

    if(i>0){
        out.println("<h3>Record Saved Successfully!</h3>");
    }

    con.close();

}catch(Exception e){
    out.println(e);
}
%>

<br><br>

<form action="save.html" method="get" style="display:inline;">
    <input type="submit" value="Add Another Record">
</form>

<form action="display.jsp" method="get" style="display:inline;">
    <input type="submit" value="Display Records">
</form>