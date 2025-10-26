/**
 *  Класс для связи с сервером.
 *  Содержит методы для отправки запросов на сервер и получения ответов
 * */
const url = `http://localhost:7070`;

export default class TicketService {
  list(callback) {
    fetch(`${url}/?method=allTickets`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((tickets) => {
        if (callback) callback(tickets);
      })
      .catch((err) => console.error(err));
  }

  get(id, callback) {
    fetch(`${url}/?method=ticketById&id=${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((ticket) => {
        if (callback) callback(ticket);
      })
      .catch((err) => console.error(err));
  }

  create(data, callback) {
    fetch(`${url}/?method=createTicket`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((tickets) => {
        if (callback) callback(tickets);
      })
      .catch((err) => console.error(err));
  }

  update(id, data, callback) {
    fetch(`${url}/?method=updateById&id=${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((tickets) => {
        if (callback) callback(tickets);
      })
      .catch((err) => console.error(err));
  }

  delete(id, callback) {
    fetch(`${url}/?method=deleteById&id=${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        if (callback) callback();
      })
      .catch((err) => console.error(err));
  }
}
