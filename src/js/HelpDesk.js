/**
 *  Основной класс приложения
 * */
import TicketForm from "./TicketForm";
import TicketView from "./TicketView";

export default class HelpDesk {
  constructor(container, ticketService) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("This is not HTML element!");
    }
    this.container = container;
    this.ticketService = ticketService;
    this.ticketView = new TicketView();
  }

  init() {
    const button = this.container.querySelector(".container-btn");

    const ticketForm = new TicketForm("Добавить тикет");
    button.addEventListener("click", ticketForm.open);

    this.ticketService.list((ticket) => {
      this.ticketView.displayTickets(ticket);
    });
  }
}
