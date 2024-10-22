/**
 * Retrieves the post ID by title from the specified post types using the WordPress REST API.
 * The function iterates over the array of post types and checks each one for the matching title.
 * Optionally, a callback function can be executed once the post ID is found.
 *
 * @param {Object} payload - The payload object containing different arguments.
 * @param {string} payload.title - The title of the post/page to search for.
 * @param {Array<string>} [payload.type=["pages"]] - An array of post types to search in. Defaults to ['pages'].
 * @param {Function} [payload.callback] - Optional callback function to be executed if a post ID is found. The callback receives the post ID and post type.
 * @returns {Array<string|string|null>} - An ID or array with IDs if found, or null if no post is found with the given title.
 * @throws {Error} - Throws an error if there is an issue with fetching data from the API.
 *
 * @example
 * const payload = {
 *   title: 'My Page Title',
 *   type: ['pages', 'posts'],
 *   callback: () => {
 *     console.log('This is a callback!');
 *   },
 *   debug: true
 *   }
 * };
 *
 *   const postID = await getIDbyTitle(payload);
 *   if (postID) {
 *     console.log(`Found post with ID: ${postID}`);
 *   } else {
 *     console.log('No post found with the specified title.');
 *   }
 */

const getIDbyTitle = async ({ title, type = ["pages"], callback, debug = false }) => {
    try {
        let postIDs = [];

        // Itera sobre el array de tipos de post (pages, posts, etc.)
        for (let postType of type) {
            // Hacemos la petición para cada tipo de post
            const response = await fetch(`${base_wp_api.root_url}/wp-json/wp/v2/${postType}?search=${encodeURIComponent(title)}`);
            const data = await response.json();

            // Si encontramos posts, filtramos aquellos cuyo título coincida exactamente
            const exactMatches = data.filter((post) => post.title.rendered.toLowerCase() === title.toLowerCase());

            // Si encontramos posts con el título exacto, agregamos sus IDs al array
            if (exactMatches.length > 0) {
                exactMatches.forEach((post) => {
                    const postID = post.id;

                    // Agrega el ID del post al array de postIDs
                    postIDs.push(postID);
                });
            }
        }

        // Ejecuta el debug si es true
        if (debug) {
            console.log(`Debug: Found ${postIDs.length} id(s) matching the required types.`);
        }

        // Ejecuta el callback si existe
        if (typeof callback === "function") {
            callback();
        }

        // Retorna el array de IDs encontrados (puede estar vacío si no hay coincidencias exactas)
        if (postIDs.length == 0) {
            return null;
        } else if (postIDs.length == 1) {
            return postIDs[0];
        } else {
            return postIDs;
        }
    } catch (error) {
        console.error("Error fetching the posts:", error);
        return null;
    }
};

export { getIDbyTitle };
