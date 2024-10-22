/**
 * Retrieves the post ID by slug from the specified post types using the WordPress REST API.
 * The function iterates over the array of post types and checks each one for the matching slug.
 * Optionally, a callback function can be executed once the post ID is found.
 *
 * @param {Object} payload - The payload object containing different arguments.
 * @param {string} payload.slug - The slug of the post/page to search for.
 * @param {Array<string>} [payload.type=["pages"]] - An array of post types to search in. Defaults to ['pages'].
 * @param {Function} [payload.callback] - Optional callback function to be executed if a post ID is found. The callback receives the post ID and post type.
 * @returns {Array<string|string|null>} - An ID or array with IDs if found, or null if no post is found with the given slug.
 * @throws {Error} - Throws an error if there is an issue with fetching data from the API.
 *
 * @example
 * const payload = {
 *   slug: 'my-page-slug',
 *   type: ['pages', 'posts'],
 *   callback: () => {
 *     console.log('This is a callback!');
 *   },
 *   debug: true
 * };
 *
 *   const postID = await getIDbySlug(payload);
 *   if (postID) {
 *     console.log(`Found post with ID: ${postID}`);
 *   } else {
 *     console.log('No post found with the specified title.');
 *   }
 */

const getIDbySlug = async ({ slug, type = ["pages"], callback, debug = false }) => {
    try {
        let postIDs = []; // Array to collect all matching post IDs

        // Itera sobre el array de tipos de post (pages, posts, etc.)
        for (let postType of type) {
            // Hacemos la petición para cada tipo de post
            const response = await fetch(`/wp-json/wp/v2/${postType}?slug=${encodeURIComponent(slug)}`);
            const data = await response.json();

            // Si encontramos posts con el slug, agregamos sus IDs al array
            if (data.length > 0) {
                data.forEach((post) => {
                    const postID = post.id;

                    // Agrega el ID al array de postIDs
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

        // Retorna el array de IDs encontrados (puede estar vacío si no hay coincidencias)
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

export { getIDbySlug };
