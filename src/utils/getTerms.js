export default async function getTerms({ marca, username, key, cardId }) {
  try {
    const response = await fetch(
      "/api/data?" +
        new URLSearchParams({
          marca,
          username,
          key,
          cardId,
        })
    );
    const data = await response.json();
    console.log(data);

    return { data };
  } catch (error) {
    console.log(error);
  }
}
