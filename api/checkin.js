export default async function handler(req, res) {
  const { guestID } = req.query;

  if (!guestID) {
    return res.status(400).send(render("❌ Invalid QR Code", "red"));
  }

  // Temporary simple database (we'll improve this after deploy)
  global.guests = global.guests || {
    G001: { name: "John Smith", status: "unused" },
    G002: { name: "Sarah Lee", status: "unused" }
  };

  const guest = global.guests[guestID];

  if (!guest) {
    return res.status(404).send(render("❌ Guest Not Found", "red"));
  }

  if (guest.status === "used") {
    return res.send(render(`❌ Already Checked In<br>${guest.name}`, "red"));
  }

  guest.status = "used";

  return res.send(render(`✅ Welcome ${guest.name}`, "green"));
}

function render(message, color) {
  return `
    <html>
      <body style="
        display:flex;
        height:100vh;
        justify-content:center;
        align-items:center;
        font-family:sans-serif;
        background:${color};
        color:white;
        font-size:2rem;
        text-align:center;">
        ${message}
      </body>
    </html>
  `;
}
