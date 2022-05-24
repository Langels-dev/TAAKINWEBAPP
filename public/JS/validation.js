const date = {
  name: document.querySelector("#fname"),
  mail: document.querySelector("#email"),
  phone: document.querySelector("#phone"),
  msg: document.querySelector("#subject"),
};

const formulario = document.querySelector("#enviar-email");
const btnSubmit = document.querySelector("#submit");

// Event listener

eventListeners();

function eventListeners() {
  const { name, mail, phone, msg } = date;

  // Inicio de la aplicacion y deshabilitar submit
  document.addEventListener("DOMContentLoaded", iniciarApp);

  // Inputs
  name.addEventListener("blur", validarCampos);
  mail.addEventListener("blur", validarCampos);
  phone.addEventListener("blur", validarCampos);
  msg.addEventListener("blur", validarCampos);

  // Buttons
  btnSubmit.addEventListener("click", EnviarEmail);
}

//Funciones
function iniciarApp() {
  btnSubmit.disabled = true;
  btnSubmit.style.backgroundColor = "rgb(41,44,47,0.5)";
}

// Valida que el campo tenga algo escrito

function validarCampos(e) {
  if (e.target.value.length > 0) {
    e.target.style.borderBottomColor = "green";
  } else {
    e.target.style.borderBottomColor = "red";
  }

  // Validar unicamente el email
  if (this.type === "email") {
    validarEmail(this);
  }

  if (
    date.name.value !== "" &&
    date.mail.value !== "" &&
    date.phone.value !== "" &&
    date.msg.value !== ""
  ) {
    btnSubmit.disabled = false;
    btnSubmit.style.backgroundColor = "#292c2f";
    btnSubmit.style.cursor = "pointer";
  }
}

function validarEmail(campo) {
  const mensaje = campo.value;

  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(mensaje.toLowerCase())) {
    campo.style.borderBottomColor = "green";
  } else {
    campo.style.borderBottomColor = "red";
    mostrarError("Email no valido");
  }
}

function EnviarEmail() {
  Swal.fire(
    "TAAKIN Form",
    "Your message was sent successfully, thank you for contacting TAAKIN PRECIOUS METAL",
    "success"
  );
}
