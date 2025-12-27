const uri = "http://www.google.com";

/**
 * This is a test function for do nothing =)
 * @param somethingToReflect - The string to reflect
 * @returns void
 */
const testToLanchFomConsole = (somethingToReflect: string) => {
  console.info(`We here to see ${somethingToReflect}`);
};

testToLanchFomConsole("Hello World!");

const fetchData = async (uri: string) => {
  let body = {};
  fetch(uri)
    .then((response) => {
      if (response.status === 200) {
        console.info(response.body);
        body = response.body;
        return body;
      }
    })
    .catch((err) => console.error(err));
};

const data = await fetchData(uri);

((a, b, c) => {
  console.log("Value of A: ", a)
  console.log("Value of B: ", b)
  console.log("Value of C: ", c)
})('Hello folks', 1234, (data: object) => { return `Here is your data; ${data}` })
