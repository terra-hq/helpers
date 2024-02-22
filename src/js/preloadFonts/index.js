import WebFont from "webfontloader";

/**
 * Preloads fonts asynchronously and resolves the Promise when the fonts are loaded.
 * It supports both Google Fonts and custom fonts.
 *
 * @param {Object} payload - An object containing information about the fonts to preload.
 *   - provider: A string indicating the font provider ('google' or 'custom').
 *   - families: An array of strings, specifying the font families to preload.
 *   - urls (optional for custom fonts): An array of strings, specifying the URLs for custom font CSS files.
 * @returns {Promise} - A Promise that resolves when the specified fonts are successfully loaded.
 *
 * @example
 * // Preload a single Google font family
 * preloadFonts({
 *   provider: 'google',
 *   families: ['Roboto']
 * }).then(() => {
 *   console.log('Roboto font preloaded successfully');
 * }).catch((error) => {
 *   console.error('Font preload error:', error.message);
 * });
 *
 * // Preload multiple Google font families
 * preloadFonts({
 *   provider: 'google',
 *   families: ['Montserrat', 'Open Sans']
 * }).then(() => {
 *   console.log('Montserrat and Open Sans fonts preloaded successfully');
 * }).catch((error) => {
 *   console.error('Font preload error:', error.message);
 * });
 *
 * // Preload custom fonts
 * preloadFonts({
 *   provider: 'custom',
 *   families: ['MyCustomFont'],
 *   urls: ['https://example.com/path/to/mycustomfont.css']
 * }).then(() => {
 *   console.log('Custom fonts preloaded successfully');
 * }).catch((error) => {
 *   console.error('Custom font preload error:', error.message);
 * });
 */

const preloadFonts = (payload) => {
    //console.log("preload " + payload.provider);

    return new Promise((resolve, reject) => {
        if (payload.provider === "google") {
            WebFont.load({
                google: {
                    families: payload.families,
                },
                active: resolve,
                inactive: reject,
            });
        } else if (payload.provider === "custom") {
            WebFont.load({
                custom: {
                    families: payload.families,
                    urls: payload.urls,
                },
                active: resolve,
                inactive: reject,
            });
        } else {
            reject(new Error("Unsupported font provider"));
        }
    });
};

export { preloadFonts };
