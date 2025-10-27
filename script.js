// Selecting elements
const addbutton = document.getElementById("add-btn");
const displaycontact = document.querySelector(".contacts-display");
const visibilityprofile = document.querySelector(".contact-detail");

// Fetch and show all contacts
async function getContactAll() { 
  try {
    const res = await fetch("https://68fb0edd94ec960660246f41.mockapi.io/details");
    const data = await res.json(); // 
    displaycontact.innerHTML = "";

    data.forEach((contact) => {
      const div = document.createElement("div");
      div.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; box-shadow: 2px 2px 5px gray; padding: 10px; margin: 10px 0; border-radius: 10px;">
          <div style="display: flex; column-gap: 10px; align-items: center;">
            <img src="${contact.image}" alt="profile image" width="50px" height="50px" style="border-radius: 50%;">
            <div>
              <b>${contact.username}</b>
              <p style="color: gray;">${contact.contactno}</p>
            </div>
          </div>
          <button onclick="deleteContact(${contact.id})" style="background:red;color:white;border:none;padding:5px 10px;border-radius:5px;cursor:pointer;">Delete</button>
        </div>
      `;

      // Show contact details when clicked
      div.addEventListener("click", () => showContactDetail(contact));
      displaycontact.appendChild(div);
    });
  } catch (err) {
    console.error("Error fetching contacts:", err);
  }
}

// Show contact details
function showContactDetail(contact) {
    visibilityprofile.style.display = "block";
  visibilityprofile.innerHTML = "";

  const detailDiv = document.createElement("div");
  detailDiv.innerHTML = `
    <div style="color: white;">
      <div style="display: flex; justify-content: space-between; align-items: center;"> 
        <span><b>Contact</b></span>
        <button onclick="editContact('${contact.id}', '${contact.username}', '${contact.contactno}', '${contact.image}')" style="background:blue;color:white;border:none;padding:5px 10px;border-radius:5px;cursor:pointer;">Edit</button>
      </div>
      <div style="display: flex; flex-direction: column; align-items: center; margin-top:10px;">
        <img src="${contact.image}" alt="profile image" width="80px" height="80px" style="border-radius: 50%; object-fit:cover;margin-bottom:5px;">
        <div style="display: flex; flex-direction: column;align-items: center;">
          <b style="font-size:18px;">${contact.username}</b>
          <p style="font-size: 15px;">${contact.contactno}</p>
        </div>
      </div>
      <div style="display: flex; justify-content: space-between; margin-block: 16px;">
            <div style="display: flex;align-items: center;flex-direction: column;">
                <img src="https://static.vecteezy.com/system/resources/previews/013/387/757/non_2x/message-icon-isolated-on-a-white-background-message-symbol-for-web-and-mobile-apps-free-vector.jpg" alt="Message" width="40px" height="40px" style="border-radius: 50%; object-fit: cover; margin-bottom:5px;">
                <b>Message</b>
            </div>
            <div style="display: flex;align-items: center;flex-direction: column;">
                <img src="https://cdn.pixabay.com/photo/2021/09/27/22/30/phone-6662438_960_720.png" alt="Call" width="40px" height="40px" style="border-radius: 50%; object-fit: cover;margin-bottom:5px;">
                <b>Call</b>
            </div>
            <div style="display: flex;align-items: center;flex-direction: column;">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv3iOdOXGz3Z8Q4eGtGEF4yxLpee5ehqYQZQ&s" alt="Video" width="40px" height="40px" style="border-radius: 50%; object-fit: cover;margin-bottom:5px;">
                <b>Video</b>
            </div>
            <div style="display: flex;align-items: center;flex-direction: column;">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_MOvm3oBSaPaStKY-IAu55DWhGviUkk28DQ&s" alt="Mail" width="40px" height="40px" style="border-radius: 50%; object-fit: cover;margin-bottom:5px;">
                <b>Mail</b>
            </div>
      </div>
      <div style="background-color: white; color: black;padding-inline: 10px; border-radius: 30px; padding-top: 10px; padding-bottom:20px;">
            <div style ="margin-block:10px;">
                <b>Mobile</b>
                <p style="border-bottom: 1px solid gray;padding-bottom: 5px; color: gray;">${contact.contactno}</p>
            </div>
            <div style ="margin-block:10px;">
                <b>Group</b>
                <p style="border-bottom: 1px solid gray; color: gray;">Family</p>
            </div>
            <div style ="margin-block:10px;">
                <b>Number Link</b>
                <p style="border-bottom: 1px solid gray; color: gray;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/2044px-WhatsApp.svg.png" alt="" width="20px" height="20px" style="border-radius: 50%; object-fit: cover;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Telegram_2019_Logo.svg/1200px-Telegram_2019_Logo.svg.png" alt="" width="20px" height="20px" style="border-radius: 50%; object-fit: cover;">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRubGyyDuQUMW5ZUy9JlRIm3bdUaWb5CnilqA&s" alt="" width="20px" height="20px" style="border-radius: 50%; object-fit: cover;">
                </p>
            </div>
            <b style="margin-bottom: 10px;">Add Favourites</b>
      </div>
    </div>
  `;
  visibilityprofile.appendChild(detailDiv);
}

//add contact
addbutton.addEventListener("click", async () => {
  const username = prompt("Enter contact name:");
  const contactno = prompt("Enter contact number:");
  const image = prompt("Enter image URL:");

  if (username && contactno && image) {
    await fetch("https://68fb0edd94ec960660246f41.mockapi.io/details", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, contactno, image }),
    });
    alert("New contact added!");
    getContactAll();
  } else {
    alert("Please fill all fields.");
  }
});

// Edit contact
async function editContact(id, oldName, oldNumber, oldImage) {
  const newName = prompt("Enter the name:", oldName);
  const newNumber = prompt("Enter the number:", oldNumber);
  const newImage = prompt("Enter image URL:", oldImage);

  if (newName && newNumber && newImage) {
    await fetch(`https://68fb0edd94ec960660246f41.mockapi.io/details/${id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username: newName,
        contactno: newNumber,
        image: newImage,
      }),
    });
    alert("Contact updated!");
    getContactAll();
  }
}

// Delete contact
async function deleteContact(id) {
  if (confirm("Delete this contact?")) {
    await fetch(`https://68fb0edd94ec960660246f41.mockapi.io/details/${id}`, {
      method: "DELETE",
    });
    alert("Contact deleted!");
    visibilityprofile.innerHTML = "";
    getContactAll();
  }
}

// Initial fetch
getContactAll();
