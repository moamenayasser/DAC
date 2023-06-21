const customEmail = (locale, imgUrl, homeLink, title, desc, data) => {
  const dynamicSection = data.reduce((prev, cur) => {
    return (
      prev +
      `
        <div
          class="sans-serif"
          style="font-size: 14px; margin-bottom: 8px"
        >
          <strong>${cur.label}:</strong> ${cur.value}
        </div>
    `
    );
  }, "");

  return `
    <!DOCTYPE html>
    <html
      lang=${locale}
      dir=${locale === "ar" ? "rtl" : "ltr"}
      xmlns:v="urn:schemas-microsoft-com:vml"
      xmlns:o="urn:schemas-microsoft-com:office:office"
    >
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="x-apple-disable-message-reformatting" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />

        <style type="text/css">
          @import url("https://fonts.googleapis.com/css?family=Montserrat:400,700|Open+Sans:400,700");
          @media only screen {
            .column,
            th,
            td,
            div,
            p {
              font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
                "Roboto", Helvetica, Arial, sans-serif;
            }
            .serif {
              font-family: "Montserrat", -apple-system, system-ui,
                BlinkMacSystemFont, "Segoe UI", "Roboto", Helvetica, Arial,
                sans-serif;
            }
            .sans-serif {
              font-family: "Open Sans", -apple-system, system-ui, BlinkMacSystemFont,
                "Segoe UI", "Roboto", Helvetica, Arial, sans-serif;
            }
          }

          a {
            text-decoration: none;
          }
          img {
            border: 0;
            line-height: 100%;
            max-width: 100%;
            vertical-align: middle;
          }

          .wrapper {
            min-width: 700px;
            min-height: 100vh;
          }
          .row {
            margin: 0 auto;
            width: 700px;
          }
          .row .row,
          th .row {
            width: 100%;
          }
          .column {
            font-size: 13px;
            line-height: 23px;
          }

          @media only screen and (max-width: 699px) {
            .wrapper {
              min-width: 100% !important;
            }
            .row {
              width: 90% !important;
            }
            .row .row {
              width: 100% !important;
            }

            .column {
              box-sizing: border-box;
              display: inline-block !important;
              line-height: inherit !important;
              width: 100% !important;
              word-break: break-word;
              -webkit-text-size-adjust: 100%;
            }
            .has-columns {
              padding-right: 20px !important;
              padding-left: 20px !important;
            }
            .has-columns .column {
              padding-right: 10px !important;
              padding-left: 10px !important;
            }
            .mobile-center {
              display: table !important;
              float: none;
              margin-left: auto !important;
              margin-right: auto !important;
            }
            .spacer {
              height: 30px;
              line-height: 100% !important;
              font-size: 100% !important;
            }
            .mobile-padding-top {
              padding-top: 30px !important;
            }
          }
        </style>
      </head>
      <body
        style="
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          width: 100%;
          -webkit-font-smoothing: antialiased;
        "
      >
        <table
          class="wrapper"
          align="center"
          bgcolor="#EEEEEE"
          cellpadding="0"
          cellspacing="0"
          width="100%"
          role="presentation"
        >
          <tr>
            <td style="padding: 30px 0">
              <!-- Header Left -->
              <table
                class="row"
                align="center"
                bgcolor="#FFFFFF"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
              >
                <tr>
                  <td class="spacer" height="10" style="line-height: 10px">
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <th
                    class="column"
                    width="640"
                    style="
                      padding-left: 30px;
                      padding-right: 30px;
                      text-align: initial;
                    "
                  >
                    <a href="${homeLink}" style="text-decoration: none">
                      <img
                        class="mobile-center"
                        src="${imgUrl}"
                        alt="Header Logo"
                        width="150"
                      />
                    </a>
                  </th>
                </tr>
                <tr>
                  <td class="spacer" height="10" style="line-height: 10px">
                    &nbsp;
                  </td>
                </tr>
              </table>
              <!-- /Header Left -->

              <!-- Intro Basic -->
              <table
                class="row"
                align="center"
                bgcolor="#f8f8f8"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
              >
                <tr>
                  <td class="spacer" height="80" style="line-height: 80px">
                    &nbsp;
                  </td>
                </tr>
                <tr>
                  <th
                    class="column has-columns"
                    width="640"
                    style="padding-left: 30px; padding-right: 30px"
                  >
                    <table
                      class="row"
                      align="center"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                    >
                      <tr>
                        <th class="column" width="640" style="text-align: initial">
                          <div
                            class="serif"
                            style="
                              color: #1f2225;
                              font-size: 28px;
                              font-weight: 700;
                              line-height: 50px;
                              margin-bottom: 30px;
                            "
                          >
                            ${title}
                          </div>
                        </th>
                      </tr>
                    </table>

                    <table
                      class="row"
                      align="center"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                    >
                      <tr>
                        <th
                          class="column mobile-padding-top"
                          width="310"
                          style="
                            padding-left: 10px;
                            color: #000;
                            font-weight: 400;
                            text-align: initial;
                          "
                        >
                          <div
                            class="sans-serif"
                            style="
                              color: #1f2225;
                              font-size: 17px;
                              margin-bottom: 30px;
                            "
                          >
                            ${desc}
                          </div>
                          ${dynamicSection}
                        </th>
                      </tr>
                    </table>
                  </th>
                </tr>
                <tr>
                  <td class="spacer" height="50" style="line-height: 50px">
                    &nbsp;
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};

export default customEmail;
