/**
 *  Класс для отображения тикетов на странице.
 *  Он содержит методы для генерации разметки тикета.
 * */
import Ticket from "./Ticket";

export default class TicketView {
  constructor() {}

  displayTickets(tickets) {
    tickets.forEach((ticket) => {
      const ticketEl = new Ticket(ticket);
      ticketEl.bindToDOM();
    });
  }
}
