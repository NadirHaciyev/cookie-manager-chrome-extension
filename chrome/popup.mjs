const textarea = window.document.querySelector(
  'textarea[data-key="cookies.txt"]'
);

const div = window.document.querySelector("#test");

const handleCookies = (cookies) => {
  div.innerHTML = JSON.stringify(cookies, null, 2);

  cookies.map((cookie) => {
    // if (cookie.domain === "steamcommunity.com") {
    //   if (cookie.name === "steamLogin") {
    //   div.innerHTML += cookie.name + ": " + cookie.value + "<br>";
    //   }
    // }
  });

  //   let str = "";
  //   cookies.forEach((cookie) => {
  //     str += cookie.domain;
  //     str += "\t";
  //     str += cookie.hostOnly === true ? "FALSE" : "TRUE";
  //     str += "\t";
  //     str += cookie.path;
  //     str += "\t";
  //     str += cookie.secure === true ? "TRUE" : "FALSE";
  //     str += "\t";
  //     str +=
  //       cookie.expirationDate === undefined
  //         ? 0
  //         : Math.round(cookie.expirationDate);
  //     str += "\t";
  //     str += cookie.name;
  //     str += "\t";
  //     str += cookie.value;

  //     str += "\n";
  // return str
  //   });
};

window.addEventListener("load", () => {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (chrome_tabs) => {
      if (chrome_tabs.length > 0) {
        let tab_id = chrome_tabs[0].id;

        chrome.cookies.getAllCookieStores((chrome_stores) => {
          let store =
            chrome_stores.find((store) => store.tabIds.includes(tab_id)) ||
            null;
          if (store !== null) {
            chrome.cookies.get(
              {
                url: "google.com",
                name: "SNID",
                storeId: store.id,
              },
              function (cookie) {
                div.innerHTML = cookie;
              }
            );

            // chrome.cookies.getAll(
            //   {
            //     storeId: store.id,
            //   },
            //   (cookies) => {
            //     handleCookies(cookies);
            //   }
            // );
          }
        });
      }
    }
  );
});
