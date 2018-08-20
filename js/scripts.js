function update_tag() 
{
  var nickname_display = document.getElementById('nickname_display');
  var graduation_year1_display = document.getElementById('graduation-year1_display'); 
  var graduation_year2_display = document.getElementById('graduation-year2_display');
  var picture_display = document.getElementById('picture_display');
  var nickname_display = document.getElementById('nickname_display'); 
  var lastname_display = document.getElementById('lastname_display');
  var fullname_display = document.getElementById('fullname_display');
  var id_display = document.getElementById('id_display'); 
  var dob_display = document.getElementById('dob_display');
  var schoolname_display = document.getElementById('schoolname_display');

  var buffradio_checked = document.getElementById("buffradio").checked;

  var nickname = document.getElementById('nick-name');
  var firstname = document.getElementById('first-name');
  var middlename = document.getElementById('middle-name');
  var lastname = document.getElementById('last-name');
  var schoolyear = document.getElementById("school-year");
  var graduationyear = document.getElementById("graduation-year");
  var id_number = document.getElementById("id-number");
  var dob = document.getElementById("date-of-birth");
  var schoolname = document.getElementById('school-name');

  schoolname_display.innerHTML = schoolname.value;
  fullname_display.innerHTML = lastname.value + ", " + firstname.value + " " + middlename.value;
  nickname_display.innerHTML = nickname.value;
  lastname_display.innerHTML = lastname.value;
  school_year_display.innerHTML = schoolyear.value;
  id_display.innerHTML = Math.floor(id_number.value % 10000000) + " - 1";
  dob_display.innerHTML = dob.value;
  graduation_year1_display.innerHTML = Math.floor((graduationyear.value % 100) / 10);
  graduation_year2_display.innerHTML = Math.floor(graduationyear.value % 10);

  if (nickname.value == "")
  {
    nickname_display.innerHTML = firstname.value;
  }

  if (buffradio_checked == true)
  {
    document.getElementById("taghead").style = "height:110px; background-color: #0d3478; color:#fac637";
    document.getElementById("tagbody").style = "height:565px; background-color: #fac637; color:#0d3478";
    fullname_display.style = "";
    id_display.style = "";
    dob_display.style = "";
  }
  else
  {
    document.getElementById("taghead").style = "height:110px; background-color: #fac637; color:#0d3478";
    document.getElementById("tagbody").style = "height:565px; background-color: #0d3478; color:#fac637";
    fullname_display.style = "color:white";
    id_display.style = "color:white";
    dob_display.style = "color:white";

  }

}

function updateImage(input) 
{
  if (input.files && input.files[0])
  {
    var reader = new FileReader();
    reader.onload = function (e) {
      document.getElementById('picture_display').src = e.target.result;
    }

    reader.readAsDataURL(input.files[0]);
  }
}

function chooseFile() {
  document.getElementById("fileInput").click();
}