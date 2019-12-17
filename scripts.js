

 document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('#pushAlarmButton').addEventListener('click', alarm);
  });

  function alarm() {
  var http = new XMLHttpRequest();
  var token = window.localStorage.getItem('token');
  console.log(token);
  try {
      http.open('Get',"http://localhost:3006/push/"+token, false );
      http.send(); //doc_alarm 추가

      if(http.readyState === 4 && http.status === 201){

      }else{
          alert("failed http communication");
      }
  }catch (e) {
      alert(e.toString());
  }
}
