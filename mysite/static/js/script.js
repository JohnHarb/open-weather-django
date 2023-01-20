function refreshtable(x)
{
  x = JSON.parse(x)
  $("#table").html("<tr><th>zip</th><th>temp</th></tr>");
  const zips = [];
  var count = 0;
  for (i of x) 
  {
    zips.push(i.zipcode);
    row = '<tr id="r'+(count)+'"><td>'+i.zipcode+'</td></tr>';
    $("#table").html($("#table").html()+row);
    count++;
  }
  for (let j = 0; j < zips.length; j++) 
  { 
    url = "https://api.openweathermap.org/data/2.5/forecast?zip="+zips[j]+"&units=imperial&appid=636db482db536c2e63020f0789968ff0";
    $.get(url, function(data, status){
      var t = data.list[0].main.temp_max;
      row ='<td>'+t+'</td>';
      $("#r"+j).append(row);
    });
  }
}

function enterHandle()
{
  var username = $("#username").val();
  $("#userlabel").html("username: " + username);
  out = {username:username,zip:"0"};
  $.post("/zip/", out, refreshtable);
}

function addHandle()
{
  var username = $("#username").val();
  var zipcode = $("#zipcode").val();
  url = "https://api.openweathermap.org/data/2.5/forecast?zip="+zipcode+"&units=imperial&appid=636db482db536c2e63020f0789968ff0";
  $.get(url)
    .done(function() {out = {username:username,zip:zipcode};$.post("/zip/", out, refreshtable);})
    .fail(function(err, status) {alert(status + ": enter a valid zipcode")});
}

$("#add").on("click", addHandle);
$("#enter").on("click", enterHandle);

setInterval(
  function(x) //repeated function
  {
    var username = $("#username").val();
    out = {username:username,zip:"0"};
    var tableData = $.ajax(
      {
        url: "/zip/",
        method: "POST",
        data: out
      }
    );
    tableData.done(refreshTable);
    tableData.fail(function( jqXHR, textStatus ) {
      alert( "Request failed: " + textStatus + JSON.stringify(jqXHR) );
    });
  }, 
  30000 //interval in ms
);