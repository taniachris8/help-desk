/**
 *  Основной класс приложения
 * */
import TicketForm from "./TicketForm";
import Ticket from "./Ticket";

export default class HelpDesk {
  constructor(container, ticketService) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("This is not HTML element!");
    }
    this.container = container;
    this.ticketService = ticketService;
  }

  init() {
    const button = this.container.querySelector(".container-btn");

    const ticketForm = new TicketForm("Добавить тикет");
    button.addEventListener("click", ticketForm.open);

    this.ticketService.list((tickets) => {
      tickets.forEach((ticket) => {
        const ticketEl = new Ticket({
          id: ticket.id,
          name: ticket.name,
          status: ticket.status,
          created: ticket.created,
        });
        ticketEl.bindToDOM();
      });
    });
  }
}
