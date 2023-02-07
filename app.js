/*class Form {
  #fields = []; //c'est des propriété privée qui ne devrais pas être accesible depuis la classe elle-même
  #title = "";

  constructor(title) {
    this.#title = title;
  }


  #submit(e) {
    // Prevent page from refreshing on form submit.
    e.preventDefault();

    // Collect the values from the form fields. formData will be an array of objects
    // with key-value pairs referring to each field's name and value. 
    const formData = this.#fields.map((field) => {
      return {
        [field.name]: field.value
      };
    });

    // Find the toast element and add the "show" class to it. 
    const toastElement = document.querySelector("#toast");
    toastElement.classList.add("show");

    // Set the text content of the toast element to be a JSON representation of formData.
    toastElement.textContent = formData.map((el) => JSON.stringify(el));

    // Wait 5 seconds, then remove the show class from the toast. 
    setTimeout(() => {
      toastElement.classList.remove("show");
    }, 5000);

    return formData;
  }
}*/

class Form {  // regarder explication dans fichier word car pas compris l'exercice
  #fields = [];
  #formElement = document.createElement("form");

  constructor(title) {
    this.title = title;
  }

  addField(field) {
    if (!field instanceof Field) {
      throw new Error("You tried to add something that is not a field");
    }
    this.#fields.push(field);
    console.log(`Added field ${field.name} to form`);
    return this;
  }

  render() {
    const titleElement = document.createElement("h1");
    titleElement.textContent = this.title;
    this.#formElement.append(titleElement);

    this.#fields.forEach((field) => {
      const fieldElement = field.render();
      this.#formElement.append(fieldElement);
    });

    const buttonElement = document.createElement("button");
    buttonElement.type = "submit";
    buttonElement.textContent = "Submit";
    this.#formElement.append(buttonElement);

    this.#formElement.addEventListener("submit", this.#submit.bind(this));

    document.body.append(this.#formElement);
  }

  #submit(e) {
    // Prevent page from refreshing on form submit.
    e.preventDefault();

    // Collect the values from the form fields. formData will be an array of objects
    // with key-value pairs referring to each field's name and value.
    const formData = this.#fields.map((field) => {
      return {
        [field.name]: field.value
      };
    });

    // Find the toast element and add the "show" class to it.
    const toastElement = document.querySelector("#toast");
    toastElement.classList.add("show");

    // Set the text content of the toast element to be a JSON representation of formData.
    toastElement.textContent = formData.map((el) => JSON.stringify(el));

    // Wait 5 seconds, then remove the show class from the toast.
    setTimeout(() => {
      toastElement.classList.remove("show");
    }, 5000);

    return formData;
  }
}

class Field {
  #inputElement = document.createElement("input");

  constructor(options) {
    this.name = options.name;
    this.type = options.type;
    this.label = options.label;
  }

  render() {
    const labelElement = document.createElement("label");
    labelElement.innerText = this.label;

    this.#inputElement.name = this.name;
    this.#inputElement.type = this.type;

    const fieldContainer = document.createElement("div");
    fieldContainer.classList.add("field-container");

    fieldContainer.append(labelElement);
    fieldContainer.append(this.#inputElement);

    return fieldContainer;
  }

  get value() {
    return this.#inputElement.value;
  }
}

const form = new Form("Signup");

const email = new Field({
  name: "email",
  type: "email",
  label: "email"
});

const password = new Field({
  name: "password",
  type: "password",
  label: "password"
});

form.addField(email).addField(password).render();


