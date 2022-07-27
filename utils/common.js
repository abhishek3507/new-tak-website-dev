const titleFormat = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

export const getFormatedTitle = (title) => {
  let reqTitle = title
    .trim()
    .toLowerCase()
    .split(" ")
    .map((item) => item.replace(titleFormat, ""))
    .filter((item) => !!item.match(titleFormat) == false)
    .filter((item) => item.length > 0)
    .join("-");
  return reqTitle;
};

export const getFormattedSefUrl = (url) => {
  return [url?.split("/")[0], url?.split("/")[2]];
};

//Return time in milliseconds
export const currentDateTime = () => {
  let today = new Date();
  let currentTime = today.getTime();
  return currentTime;
};

//Get meta keywords
export const getMetaKeywordsFromArray = (arr) => {
  let result = "";
  if (arr?.length > 0) {
    arr.forEach((element, index) => {
      if (index == arr.length - 1) {
        result += element;
      } else {
        result += element + ",";
      }
    });
  }
  return result;
};
