import HelpDesk from "./HelpDesk";
import TicketService from "./TicketService";

const container = document.querySelector(".container");

const ticketService = new TicketService();
const app = new HelpDesk(container, ticketService);

app.init();
