const fs = require("fs");

const parse = require("csv-parse/lib/sync");

function base64(str) {
  return Buffer.from(str).toString("base64");
}

function generate() {
  const kunder = parse(fs.readFileSync(`./data/raw/kunder.csv`));
  const forbrug = parse(fs.readFileSync(`./data/raw/forbrug.csv`));
  const fakturaer = parse(fs.readFileSync(`./data/raw/fakturaer.csv`));
  const målere = parse(fs.readFileSync(`./data/raw/målere.csv`));

  var users = [];
  {
    kunder.forEach((data, i) => {
      users[i] = {
        id: fakturaer[i][0],
        name: `${data[0]} ${data[1]}`,
        email: data[2].toLowerCase(),
        phone: data[3],
        primary_address: {
          id: base64(data[4]),
          address: data[4],
        },
        addresses: data
          .splice(4)
          .filter((d) => d !== "")
          .map((d) => {
            return {
              id: base64(d),
              address: d,
            };
          }),
      };
    });
  }

  var invoices = [];
  {
    fakturaer.forEach((data, i) => {
      const date = new Date(+data[2]);

      invoices[i] = {
        id: data[1],
        date: {
          day: date.getDay() + 1,
          month: date.getMonth() + 1,
          year: date.getFullYear(),
        },
        usage: {
          price: +forbrug[i][0],
          kwh: +forbrug[i][1],
        },
      };
    });

    invoices = invoices.sort((a, b) => {
      const av = +`${a.date.year}${a.date.month}${a.date.day}`;
      const bv = +`${b.date.year}${b.date.month}${b.date.day}`;

      return av > bv ? 1 : av == bv ? 0 : -1;
    });
  }

  function pop(last) {
    const month =
      (last !== undefined && last.date !== undefined && last.date.month + 1) ||
      0;
    const invoice = invoices.find(
      (i) => i !== undefined && i.date.month > month
    );

    const index = invoices.indexOf(invoice);
    if (index > -1) {
      invoices.splice(index, 1);
    }

    return invoice;
  }

  {
    users.forEach((user) => {
      user.addresses.forEach((address) => {
        const measure_index = Math.floor(Math.random() * 10);
        address.measure_device = målere[measure_index][0];
        address.invoices = [];
        for (var x = 0; x < 2; x++) {
          address.invoices.push(
            pop(address.invoices[address.invoices.length - 1])
          );
        }

        address.invoices.forEach((invoice, i) => {
          invoice.measure = +målere[measure_index][10 - i];
        });
      });
    });
  }

  fs.writeFileSync("data/data.json", JSON.stringify(users));
}

generate();
