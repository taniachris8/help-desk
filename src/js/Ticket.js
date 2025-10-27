import TicketForm from "./TicketForm";
import TicketService from "./TicketService";
import pencil from "../icons/pencil.png";

export default class Ticket {
  constructor({ id, name, description, status, created }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.status = status;
    this.created = created;

    this.ticket = null;

    this.edit = this.edit.bind(this);
    this.delete = this.delete.bind(this);
    this.displayDescription = this.displayDescription.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.formatDate = this.formatDate.bind(this);

    this.ticketService = new TicketService();
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
       <span class="ticket-date">${this.formatDate()}</span>
       <div class="ticket-btns">
        <button class="edit-btn"><img class="pencil" src=${pencil} alt="edit"></button>
        <button class="delete-btn">&#x2716</button></div>
        </div>
        </div>
        <p class="ticket-description">${this.description}</p>
        `;

    container.append(this.ticket);

    this.editBtn = this.ticket.querySelector(".edit-btn");
    this.deleteBtn = this.ticket.querySelector(".delete-btn");
    this.ticket.addEventListener("click", this.displayDescription);
    this.checkbox = this.ticket.querySelector(".checkbox");
    this.checkbox.checked = this.status;
    this.ticketDescription = this.ticket.querySelector(".ticket-description");

    this.editBtn.addEventListener("click", this.edit);
    this.deleteBtn.addEventListener("click", this.delete);
    this.checkbox.addEventListener("change", this.updateStatus);
  }

  formatDate() {
    const date = new Date(this.created);
    const dateStr = date.toLocaleDateString("ru-RU");
    const timeStr = date.toLocaleTimeString("ru-RU", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    return `${dateStr} ${timeStr}`;
  }

  edit() {
    const ticketForm = new TicketForm("Изменить тикет");
    ticketForm.ticket = this;
    ticketForm.open();

    if (!this.description) {
      this.ticketService.get(this.id, (ticket) => {
        ticketForm.input.value = ticket.name;
        ticketForm.textarea.value = ticket.description;
      });
    } else {
      ticketForm.input.value = this.name;
      ticketForm.textarea.value = this.description;
    }
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
    if (
      event.target.tagName === "INPUT" ||
      event.target.tagName === "BUTTON" ||
      event.target.tagName === "IMG"
    ) {
      return;
    }

    if (!this.description) {
      this.ticketService.get(this.id, (ticket) => {
        if (!ticket.description) return;
        this.description = ticket.description;
        this.ticketDescription.textContent = this.description;
        this.ticketDescription.classList.toggle("active");
      });
    } else {
      this.ticketDescription.classList.toggle("active");
    }
  }

  updateStatus() {
    this.status = this.checkbox.checked;

    this.ticketService.update(this.id, { status: this.status }, () => {
      this.checkbox.checked = this.status;
    });
  }
}
