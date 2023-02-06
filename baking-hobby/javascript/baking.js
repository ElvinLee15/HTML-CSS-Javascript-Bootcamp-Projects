// preload empty lists in session storage if first time opening the pages to store the data
const preLoadLists = () => {
  // Identify which recipe page we are on using h1
  let currentRecipe = document.querySelector("h1").innerHTML;

  // If saveRecipeList has not been created yet
  if (sessionStorage.getItem("saveRecipeSession") == null) {
    sessionStorage.setItem("saveRecipeSession", true);

    // Create empty savedRecipeList in session Storage
    let savedRecipeList = [];

    sessionStorage.setItem("savedRecipeList", JSON.stringify(savedRecipeList));
  }

  if (sessionStorage.getItem("savedRecipeURLSession") == null) {
    sessionStorage.setItem("savedRecipeURLSession", true);

    // Create empty savedRecipeList in session Storage
    let savedRecipeURLList = [];

    sessionStorage.setItem(
      "savedRecipeURLList",
      JSON.stringify(savedRecipeURLList)
    );
  }

  // If commentsList has not been created yet
  if (sessionStorage.getItem(`${currentRecipe}commentSession`) == null) {
    sessionStorage.setItem(`${currentRecipe}commentSession`, true);

    // Create empty commentList in session Storage
    let commentList = [];
    sessionStorage.setItem(
      `${currentRecipe}commentList`,
      JSON.stringify(commentList)
    );
  }

  // Else comments has already been loaded, load stored comments
  else {
    // Get session store commentList
    let savedComments = JSON.parse(
      sessionStorage.getItem(`${currentRecipe}commentList`)
    );

    savedComments.forEach((comment) => {
      // New Comment li element is created
      let newComment = document.createElement("li");

      // Update li element to value of comment
      newComment.innerHTML = comment;

      // Append li element to commentsList
      document.getElementById(`commentList`).appendChild(newComment);
    });
  }

  // preLoad number of likes
  if (sessionStorage.getItem(`${currentRecipe}likeSession`) == null) {
    sessionStorage.setItem(`${currentRecipe}likeSession`, true);
    let likeCounter = 0;
    sessionStorage.setItem(
      `${currentRecipe}likeCounter`,
      JSON.stringify(likeCounter)
    );

    // Change like button to display number of total likes after pressed
    document.getElementById("likeButton").innerHTML = `Like +${likeCounter}`;
  } else {
    let currentLikeCounter = JSON.parse(
      sessionStorage.getItem(`${currentRecipe}likeCounter`)
    );
    document.getElementById(
      "likeButton"
    ).innerHTML = `Like +${currentLikeCounter}`;
  }
};

// Add Comments Function
const addComment = () => {
  // Identify which recipe page we are on using h1
  let currentRecipe = document.querySelector("h1").innerHTML;

  console.log(currentRecipe);

  let updateCommentList = JSON.parse(
    sessionStorage.getItem(`${currentRecipe}commentList`)
  );

  console.log(updateCommentList);

  // Obtain user comment input in form
  let userCommentInput = document.getElementById(`commentsInput`);

  // Push new comment to the list and update session comment list
  updateCommentList.push(userCommentInput.value);
  sessionStorage.setItem(
    `${currentRecipe}commentList`,
    JSON.stringify(updateCommentList)
  );

  console.log(updateCommentList);

  // New Comment li element is created
  let newComment = document.createElement("li");

  // Update li element to value of comment
  newComment.innerHTML = userCommentInput.value;

  // Append li element to commentsList
  document.getElementById(`commentList`).appendChild(newComment);

  // Empty Comment Input box after inputting comment
  userCommentInput.value = "";
};

// Save Recipe Function
const saveRecipe = () => {
  // Get name of recipe from h1
  let recipeName = document.querySelector("h1").innerHTML;

  // Checks if recipe has already been added to savedRecipes List
  if (sessionStorage.getItem(`${recipeName}RecipeAdded`) == null) {
    // Set it to true (added)
    sessionStorage.setItem(`${recipeName}RecipeAdded`, true);

    let updateSavedRecipeList = JSON.parse(
      sessionStorage.getItem("savedRecipeList")
    );

    // push recipe name to savedRecipes List
    updateSavedRecipeList.push(recipeName);

    // Create savedRecipesList in sessionStorage
    sessionStorage.setItem(
      "savedRecipeList",
      JSON.stringify(updateSavedRecipeList)
    );

    // count of recipes is length of savedRecipes List
    alert(updateSavedRecipeList.length);

    // add page url to savedRecipeURL List
    let updateSavedRecipeURLList = JSON.parse(
      sessionStorage.getItem("savedRecipeURLList")
    );
    let recipeURL = window.location.href;

    updateSavedRecipeURLList.push(recipeURL);
    sessionStorage.setItem(
      "savedRecipeURLList",
      JSON.stringify(updateSavedRecipeURLList)
    );
  }

  // Else alert user that the recipe has already been saved
  else {
    alert("Recipe has already been saved.");
  }
};

// Load Saved Recipes into table when page is opened
const loadRecipes = () => {
  let savedRecipes = JSON.parse(sessionStorage.getItem("savedRecipeList"));
  let savedRecipesTable = document.getElementById("savedRecipesTable");
  let savedRecipesURL = JSON.parse(
    sessionStorage.getItem("savedRecipeURLList")
  );

  let i = 0;

  // Create a new row for each recipe in the table and append the recipe to the table.
  savedRecipes.forEach((recipe) => {
    // url and recipe will have same index value, so a counter is used to reference and obtain the recipe URL
    let row = document.createElement("tr");
    let recipeNameCell = document.createElement("td");
    let recipeLink = document.createElement("a");

    // Creation of each item (recipe) into the table
    recipeLink.innerHTML = recipe;
    savedRecipesTable.appendChild(row);
    row.appendChild(recipeNameCell);
    recipeNameCell.appendChild(recipeLink);
    recipeLink.href = savedRecipesURL[i];
    i += 1;
  });
};

// Like Button
const like = () => {
  let currentRecipe = document.querySelector("h1").innerHTML;
  let updateLikeCounter = JSON.parse(
    sessionStorage.getItem(`${currentRecipe}likeCounter`)
  );

  // Increase Like counter by 1
  updateLikeCounter += 1;

  // Update Like counter on display
  document.getElementById(
    "likeButton"
  ).innerHTML = `Like +${updateLikeCounter}`;

  sessionStorage.setItem(
    `${currentRecipe}likeCounter`,
    JSON.stringify(updateLikeCounter)
  );
};
