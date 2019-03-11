var show=0;
function signUp(){
	if(disply==1){
		loginForm.style.display="none";
		disply=0;
	}

	SignUp.style.display="block";
	text.style.display="none";
	fn.focus();
	show++;
	if(show==2)
	{
		SignUp.style.display="none";
		text.style.display="block";
		show=0;
	}
	
}

var disply=0;
function login(){
	if(show==1){
		SignUp.style.display="none";
		show=0;
	}

	loginForm.style.display="block";
	text.style.display="none";
	user.focus();
	disply++;
	if(disply==2)
	{
      loginForm.style.display="none";
      text.style.display="block";
      disply=0;
	}
}
var mt=0;
function m()
{
nv.style.display="block";
mt++;
if(mt==2)
{
	nv.style.display="none";
	mt=0;
}
}