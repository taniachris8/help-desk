import TicketService from "./TicketService";
import Ticket from "./Ticket";

export default class TicketForm {
  constructor(title) {
    this.title = title;

    const container = document.querySelector(".container");

    this.form = document.createElement("form");
    this.form.classList.add("ticket-form");
    this.form.method = "POST";
    this.form.action = "http://localhost:7070";
    this.form.innerHTML = `
        <p class="form-title">${this.title}</p>
        <div class="form-content">
        <label class="form-label"> Краткое описание
        <input class="form-input" type="text" name="short-description">
        </label>
        <label class="form-label">Подробное описание
        <textarea class="form-textarea" name="detailed-description"></textarea>
        </label>
        </div>
        <div class="buttons">
        <button type="button" class="close-btn">Отмена</button>
        <button class="submit-btn" type="submit">Ок</button>
        </div>
        `;

    container.append(this.form);

    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    const closeBtn = this.form.querySelector(".close-btn");
    closeBtn.addEventListener("click", this.close);

    this.form.addEventListener("submit", this.submit);

    this.input = this.form.querySelector(".form-input");
    this.textarea = this.form.querySelector(".form-textarea");

    this.input.addEventListener("input", () => {
      if (this.input.classList.contains("invalid")) {
        this.input.classList.remove("invalid");
        this.input.placeholder = "";
      }
    });
  }

  open() {
    this.form.classList.add("active");
    setTimeout(() => {
      if (this.title !== "Удалить тикет") {
        document.addEventListener("mousedown", this.handleOutsideClick);
      }
    }, 0);
  }

  handleOutsideClick(event) {
    if (!this.form.contains(event.target)) {
      this.close();
    }
  }

  close() {
    this.form.reset();
    this.form.classList.remove("active");
    this.input.classList.remove("invalid");
    this.input.placeholder = "";

    document.removeEventListener("mousedown", this.handleOutsideClick);
  }

  submit(e) {
    e.preventDefault();
    const ticketService = new TicketService();

    if (this.title === "Добавить тикет") {
      const ticketData = {
        name: this.input.value.trim(),
        description: this.textarea.value.trim(),
      };

      if (ticketData.name) {
        ticketService.create(ticketData, (newTicket) => {
          const ticketEl = new Ticket(newTicket);
          ticketEl.bindToDOM();
          this.close();
        });
      } else {
        this.input.classList.add("invalid");
        this.input.placeholder = "Поле обязательно к заполнению";
      }
    } else if (this.title === "Изменить тикет") {
      const ticketData = {
        name: this.input.value.trim(),
        description: this.textarea.value,
      };

      if (ticketData.name) {
        ticketService.update(this.ticket.id, ticketData, (updatedTicket) => {
          if (updatedTicket && updatedTicket.id) {
            this.ticket.name = updatedTicket.name;
            this.ticket.description = updatedTicket.description;
          } else {
            this.ticket.name = ticketData.name;
            this.ticket.description = ticketData.description;
          }

          const ticketEl = this.ticket.ticket;
          if (ticketEl) {
            ticketEl.querySelector(".ticket-name").textContent =
              this.ticket.name;

            ticketEl.querySelector(".ticket-description").textContent =
              this.ticket.description;
            ticketEl
              .querySelector(".ticket-description")
              .classList.remove("active");
          }

          this.close();
        });
      } else {
        this.input.classList.add("invalid");
        this.input.placeholder = "Поле обязательно к заполнению";
      }
    } else if (this.title === "Удалить тикет") {
      ticketService.delete(this.ticket.id, () => {
        this.ticket.ticket.remove();
        this.close();
      });
    }
  }
}
