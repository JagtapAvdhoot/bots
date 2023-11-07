exports.extractData = (components) => {
  const products = components.map((item, index) => {
    const prod = {
      title: "",
      discount: "",
      price: "",
      star: "",
      reviews: "",
      image: "",
      link: "",
      index,
    };

    let title = item.querySelector(
      "span.a-size-medium.a-color-base.a-text-normal"
    );
    if (!title) {
      title = item.querySelector(
        "span.a-size-base-plus.a-color-base.a-text-normal"
      );
    }

    let price = item.querySelector("span.a-price-whole");

    const discount = item.querySelector(
      ".a-row.a-size-base.a-color-base > span.a-letter-space + span"
    );

    const star = item.querySelector(".a-size-base.puis-bold-weight-text");

    const image = item.querySelector("img.s-image");

    const linkAndReview = item.querySelector(
      "a.a-link-normal.s-underline-text.s-underline-link-text.s-link-style > .a-size-base.s-underline-text"
    );

    if (title && title.innerHTML) {
      prod.title = title.innerHTML;
    }
    if (price && price.innerHTML) {
      prod.price = price.innerHTML.replace(/[^0-9]+/g, "");
    }
    if (discount && discount.innerHTML) {
      prod.discount = discount.innerHTML.replace(/[^0-9]+/g, "") + "%";
    }
    if (star && star.innerHTML) {
      prod.star = star.innerHTML.replace(/[^0-9]+/g, "");
    }
    if (image && image.src) {
      prod.image = image.src;
    }
    if (linkAndReview && linkAndReview.innerHTML) {
      prod.reviews = linkAndReview.innerHTML.replace(/[^0-9]+/g, "");
      prod.link = linkAndReview.parentElement.href;
    }

    if (title === "") return;

    return prod;
  });

  return products;
};
exports.extractDataTwo = async (page) => {
  return await page.$$eval(".s-result-item", (components) => {
    const products = components.map((item, index) => {
      const prod = {
        title: "",
        discount: "",
        price: "",
        // star: "",
        reviews: "",
        // image: "",
        link: "",
        // index,
      };

      let title = item.querySelector(
        "span.a-size-medium.a-color-base.a-text-normal"
      );
      if (!title) {
        title = item.querySelector(
          "span.a-size-base-plus.a-color-base.a-text-normal"
        );
      }

      let price = item.querySelector("span.a-price-whole");

      const discount = item.querySelector(
        ".a-row.a-size-base.a-color-base > span.a-letter-space + span"
      );

      // const star = item.querySelector(".a-size-base.puis-bold-weight-text");

      // const image = item.querySelector("img.s-image");

      const linkAndReview = item.querySelector(
        "a.a-link-normal.s-underline-text.s-underline-link-text.s-link-style > .a-size-base.s-underline-text"
      );

      if (title && title.innerHTML) {
        prod.title = title.innerHTML;
      }
      if (price && price.innerHTML) {
        prod.price = price.innerHTML.replace(/[^0-9]+/g, "");
      }
      if (discount && discount.innerHTML) {
        prod.discount = discount.innerHTML.replace(/[^0-9]+/g, "") + "%";
      }
      // if (star && star.innerHTML) {
      //   prod.star = star.innerHTML.replace(/[^\d.]+/g, "");
      // }
      // if (image && image.src) {
      //   prod.image = image.src;
      // }
      if (linkAndReview && linkAndReview.innerHTML) {
        prod.reviews = linkAndReview.innerHTML.replace(/[^0-9]+/g, "");
        prod.link =
          linkAndReview.parentElement.href.split("?")[0] +
          "&tag=jaavgtahoap-21";
      }

      if (title === "") return;

      return prod;
    });

    return products;
  });
};
