# XIDAR Halloween 2024 Integration Guide

Welcome to the XIDAR Halloween 2024 integration guide! Follow these steps to add the Halloween event experience to your website.

## Installation Options

There are three ways to integrate the script into your website. We recommend **Option 1** as the easiest and most straightforward approach.

### Option 1: Hosted Script (Recommended)

Add the following code to your website's footer to load the hosted version of the Halloween event script:

```html
<script id="XIDARHalloween2024" type="module"></script>
<script>document.getElementById('XIDARHalloween2024').setAttribute('src', "https://my.xidar.io/assets/scripts/halloween2024.js?u=" + Date.now())</script>
```

**Note**: The `Date.now()` parameter prevents caching, ensuring your visitors always load the latest version.

---

### Option 2: Direct Script File Integration

You can also use the script file directly from our `dist` folder. Simply add the following in your HTML:

```html
<script src="path/to/dist/main.js"></script>
```

Replace `"path/to/dist/main.js"` with the correct path to the `main.js` file.

---

### Option 3: Clone and Build the Project

1. Clone the repository to your local machine:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project folder and install dependencies:

   ```bash
   npm install
   ```

3. Build the project using Webpack:

   ```bash
   npx webpack
   ```

4. Once built, include the freshly generated `dist/main.js` file in your HTML footer:

   ```html
   <script src="path/to/your/cloned-project/dist/main.js"></script>
   ```

This option allows you to fully control the script version used on your site.

---

## Support

If you have questions or need further assistance, feel free to contact us.

Thank you for partnering with us for XIDAR Halloween 2024! 🎃

--- 

This README provides clear guidance for each integration option. Let me know if there are any specific details you’d like to add!