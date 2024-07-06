
function portfolio_loader(bool)
{
  if(document.getElementById("portfolio_loader"))
    document.getElementById("portfolio_loader").style.display=(bool?"flex":"none");
}
portfolio_loader(true);


document.addEventListener("DOMContentLoaded", (e) => {
  portfolio_loader(false);
  function init_toast(message = "", id = "my_toast") {
    const toast = document.querySelector(`.toast#${id}`);
	toast.style.zIndex='10000';
    if (message)
      document.querySelector(`#${id} #message`).innerText = message;
    toaster = new bootstrap.Toast(toast);
    toaster.show();
  }
  

  window.addEventListener("offline",(e)=>{
    init_toast("Oops! You are Offline now.","my_toast_offline");
  });
  window.addEventListener("online",(e)=>{
    init_toast("Yeah! You back Online.","my_toast_offline");
  })
  $("#connect-form").submit(function (e) {
    e.preventDefault();
    let data = $(this).serialize();

    $.ajax({
      type: "POST",
      url: "https://sis107.infinityfreeapp.com/Portfolio/assets/php/connect_form_handle.php",
      data: data,
      success: function (response, status, jxhr) {
        // console.log(response)
        if (jxhr.status == 200) {
          init_toast("");
          setTimeout(()=>{$('form').trigger('reset');},500);
        }
      },
      error: function (xhr, status, error) {
        //console.log(xhr.status, error);
        init_toast(`Sorry! It's an Error\nWe'll figure this out.`);
		setTimeout(()=>{$('form').trigger('reset');},500);
      }

    })
  })


 /*   const cards = document.querySelectorAll('section');
    const edu=document.getElementById("education");
    let edu_top=parseInt(edu.offsetTop/100)*100;
    let edu_calc=0;
    //console.log(cards);
    cards.forEach(lion => {
      if(lion.id!="home")
        lion.style.transform = "translateY(100px)";
      window.addEventListener("scroll", (e) => {
        //console.log(lion.offsetTop);
        if(edu_calc!=1)
        {
            edu_top=(parseInt(edu.offsetTop/100)*100)-400;
            //console.log("calculation");
            edu_calc=1;
        }
        if((window.scrollY>edu_top) &&  (window.scrollY<(edu_top+10)) )
            initprogall();
        if (window.scrollY > (lion.offsetTop - 400)) {

           // console.log(window.scrollY,lion.offsetTop)
          
          lion.style.transition = "all 1s";
          lion.style.opacity = "100%";
          lion.style.transform = "translateY(0px)";

        }
        else {
          lion.style.transition = "all 1.5s";
          lion.style.opacity = "0%";
          lion.style.transform = "translateY(100px)";
        }
      })
    })
*/
    const nav_lists=document.querySelectorAll(".navbar-nav li");
    nav_lists.forEach(element=>{
        element.addEventListener("click",(e)=>{
            if(e.target.className=='nav-link')
            setTimeout(()=>{e.target.parentElement.parentElement.parentElement.classList.remove("show");},250);
        })
    })
    function startprog(circ) {
      // circ.children[1].style.opacity="10%";
      let n = circ.dataset.value || 0;
      let p = 0;
      if (n > 100)
        n = 100;
      if (n < 0)
        n = 0;
      //const circ = document.querySelector("#" + pid);

      function circprogress() {
        circ.style.background = "conic-gradient(rgb(23, 182, 245) " + p + "%, rgb(206, 203, 203) 0%)";
        circ.children[0].innerText = p + "%";
        if (p < n)
          setTimeout(requestAnimationFrame(circprogress), 100);
        // else
        //   circ.children[1].style.opacity="100%";
        p++;
      }
      circprogress();
    }
    function initprogall()
    {
    const circs = document.querySelectorAll(".circprogress")
    circs.forEach(element => {
      startprog(element)

      // element.addEventListener("mouseover",(e)=>{
      //   startprog(element)
      // })

    })
    }
    initprogall();
    document.addEventListener("scroll", (e) => {
    if (window.scrollY > 30) {
      document.getElementById("toparrow").style.opacity = "100%";
      document.getElementById("toparrow").style.right = "0.5rem";

    }
    else {
      document.getElementById("toparrow").style.opacity = "0%";
      document.getElementById("toparrow").style.right = "-3rem";
    }
  })

  })
  
