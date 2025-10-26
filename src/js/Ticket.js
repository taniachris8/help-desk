import TicketForm from "./TicketForm";
import pencil from "../icons/pencil.png";

export default class Ticket {
  constructor({ id, name, description, status, created }, ticketService) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
    this.created = created;

    this.ticketService = ticketService;

    this.ticket = null;

    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.displayDescription = this.displayDescription.bind(this);
  }

  bindToDOM() {
    const container = document.querySelector(".tickets-container");
    this.ticket = document.createElement("div");
    this.ticket.classList.add("ticket");
    this.ticket.innerHTML = `
      <div class="ticket-details">
       <div class="left-part">
        <input type="checkbox" class="checkbox">
        <p class="ticket-name">${this.name}</p>
       </div>
       <div class="right-part">
       <span class="ticket-date">${this.created}</span>
       <div class="ticket-btns">
        <button class="edit-btn"><img class="pencil" src=${pencil} alt="edit"></button>
        <button class="delete-btn">&#x2716</button></div>
        </div></div>
         <p class="ticket-description">${this.description}</p>
        `;

    container.append(this.ticket);

    this.editBtn = this.ticket.querySelector(".edit-btn");
    this.deleteBtn = this.ticket.querySelector(".delete-btn");
    this.ticket.addEventListener("click", this.displayDescription);

    this.editBtn.addEventListener("click", this.edit);
    this.deleteBtn.addEventListener("click", this.delete);
  }

  edit() {
    const ticketForm = new TicketForm("Изменить тикет");
    ticketForm.ticket = this;
    ticketForm.open();

    ticketForm.input.value = this.name;
    ticketForm.textarea.value = this.description;
  }

  delete() {
    const ticketForm = new TicketForm("Удалить тикет");
    ticketForm.ticket = this;
    const formContent = ticketForm.form.querySelector(".form-content");
    formContent.innerHTML = `
           <p>Вы уверены, что хотите удалить тикет? Это действие необратимо.</p>
          `;
    ticketForm.open();
  }

  displayDescription(event) {
    if (this.description) {
      if (
        event.target.tagName !== "INPUT" &&
        event.target.tagName !== "BUTTON" &&
        event.target.tagName !== "IMG"
      ) {
        const ticketDescription = this.ticket.querySelector(
          ".ticket-description",
        );
        ticketDescription.classList.toggle("active");
      }
    }
  }
}
