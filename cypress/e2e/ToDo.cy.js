describe("Extensive Buggy To-do App", () => {
  const baseUrl = "https://bug-test-swart.vercel.app/";
  beforeEach(() => {
    cy.visit(baseUrl);
  });

  function addTask(description, category, priority, dueDate) {
    cy.get("input[placeholder='Task description']").click().type(description);
    cy.get(".bg-white > :nth-child(2) > .w-full").select(category);
    cy.get(`input[value='${priority}']`).check();
    cy.get(".react-datepicker__input-container > .w-full")
      .clear()
      .type(dueDate);
    cy.get(".bg-blue-500").click();
  }

  it("TC:01 Url testing and web form visibilty verification", () => {
    cy.url().should("eq", baseUrl).and("include", "test-swart");
    cy.get(".text-3xl")
      .should("be.visible")
      .and("exist")
      .and("have.text", "Extensive Buggy To-Do App");

    cy.get(".bg-white>div.mb-4").should("be.visible").and("have.length", 4);
    //As toggle dark mode is a button we have to use the enabled too.
    cy.get(".flex > .p-2")
      .should("be.visible")
      .and("be.enabled")
      .and("exist")
      .and("have.text", "Toggle Dark Mode");

    cy.get(".text-blue-500").should("be.visible").and("have.text", "About");

    cy.get(".max-w-4xl > :nth-child(1) > .w-full")
      .should("be.visible")
      .and("have.text", "0%");

    //Task Descriprtion
    cy.get(".bg-white > :nth-child(1) > .w-full")
      .should("be.visible")
      .and("have.attr", "placeholder", "Task description");

    //Category
    cy.get(".bg-white > :nth-child(2) > .w-full").should("be.visible");

    //Priority
    cy.get(".bg-white > :nth-child(3) > .block").should("exist");

    //Due Date
    cy.get(".bg-white > :nth-child(4) > .block").should("exist");

    //Button
    cy.get(".bg-blue-500").should("be.visible").and("have.text", "Add Task");
  });

  it("TC02:Add task with all valid data", () => {
    cy.get("input[placeholder='Task description']")
      .click()
      .should("be.visible")
      .and("have.attr", "placeholder", "Task description")
      .and("not.be.disabled")
      .type("Buggy App");

    cy.get(".bg-white > :nth-child(2) > .w-full")
      .select("Work")
      .and("have.value", "Work");

    cy.get("input[value='Medium']").check().should("be.checked");

    cy.get("input[value='Low']").should("not.be.checked");

    cy.get("input[value='High']").should("not.be.checked");

    cy.get(".react-datepicker__input-container > .w-full")
      .clear()
      .type("07/21/2025");

    cy.get(".bg-blue-500")
      .should("be.visible")
      .and("have.text", "Add Task")
      .click();

    cy.get(".p-4 > .items-center > div > :nth-child(1)")
      .should("be.visible")
      .and("have.text", "Buggy App");
  });

  it("Add task with empty description", () => {
    // Reload the page before test
    cy.reload();

    // Select 'Work' from dropdown and assert its value
    cy.get(".bg-white > :nth-child(2) > .w-full").select("Work");
    cy.get(".bg-white > :nth-child(2) > .w-full").should("have.value", "Work");

    cy.get("input[value='Low']").check().should("be.checked");
    cy.get("input[value='Medium']").should("not.be.checked");
    cy.get("input[value='High']").should("not.be.checked");

    cy.get(".react-datepicker__input-container > .w-full")
      .clear()
      .type("07/21/2025");

    cy.get(".bg-blue-500")
      .should("be.visible")
      .and("have.text", "Add Task")
      .click();

    //expected for a error message to be shown but its not visible
  });

  it("Add task and check for confirmation that task has been added successfully", () => {
    // Reload the page before test
    cy.reload();
    cy.get("input[placeholder='Task description']")
      .click()
      .should("be.visible")
      .and("have.attr", "placeholder", "Task description")
      .and("not.be.disabled")
      .type("Buggy App");
    // Select 'Work' from dropdown and assert its value
    cy.get(".bg-white > :nth-child(2) > .w-full").select("Personal");
    cy.get(".bg-white > :nth-child(2) > .w-full").should(
      "have.value",
      "Personal"
    );

    cy.get("input[value='Medium']").check().should("be.checked");
    cy.get("input[value='Low']").should("not.be.checked");
    cy.get("input[value='High']").should("not.be.checked");

    cy.get(".react-datepicker__input-container > .w-full")
      .clear()
      .type("07/21/2025");

    cy.get(".bg-blue-500")
      .should("be.visible")
      .and("have.text", "Add Task")
      .click();

    //expected for a confirmation message that user has been added successfully to be shown but its not visible
  });

  it("Add task with no category, priority, duedate selected", () => {
    // Reload the page before test
    cy.reload();
    cy.get("input[placeholder='Task description']")
      .click()
      .should("be.visible")
      .and("have.attr", "placeholder", "Task description")
      .and("not.be.disabled")
      .type("Buggy App");

    cy.get(".bg-blue-500")
      .should("be.visible")
      .and("have.text", "Add Task")
      .click();

    //other field has been added by default and it is as expected.
  });
  it("check for the selection of each category and its visibility in application", () => {
    // Reload the page before test
    cy.reload();

    // Select 'Work' from dropdown and assert its value
    cy.get(".bg-white > :nth-child(2) > .w-full").select("Work");
    cy.get(".bg-white > :nth-child(2) > .w-full").should("have.value", "Work");

    // Select 'Personal' from dropdown and assert its value
    cy.get(".bg-white > :nth-child(2) > .w-full").select("Personal");
    cy.get(".bg-white > :nth-child(2) > .w-full").should(
      "have.value",
      "Personal"
    );

    // Select 'Shopping' from dropdown and assert its value
    cy.get(".bg-white > :nth-child(2) > .w-full").select("Shopping");
    cy.get(".bg-white > :nth-child(2) > .w-full").should(
      "have.value",
      "Shopping"
    );

    // Select 'Other' from dropdown and assert its value
    cy.get(".bg-white > :nth-child(2) > .w-full").select("Other");
    cy.get(".bg-white > :nth-child(2) > .w-full").should("have.value", "Other");
  });

  it("check for the selection of each priority and its visibility in application", () => {
    // Reload the page before test
    cy.reload();

    cy.get("input[value='Low']").check().should("be.checked");
    cy.get("input[value='Medium']").should("not.be.checked");
    cy.get("input[value='High']").should("not.be.checked");

    cy.get("input[value='Medium']").check().should("be.checked");
    cy.get("input[value='Low']").should("not.be.checked");
    cy.get("input[value='High']").should("not.be.checked");

    cy.get("input[value='High']").check().should("be.checked");
    cy.get("input[value='Medium']").should("not.be.checked");
    cy.get("input[value='Low']").should("not.be.checked");
  });

  it("Enter random text in date field and check rollback to today", () => {
    cy.reload();
    const today = new Date();
    const formatted = today.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });

    cy.get(".react-datepicker__input-container > .w-full").then(($input) => {
      $input.val("XYZ");
      $input.trigger("blur");
    });

    cy.get(".react-datepicker__input-container > .w-full", {
      timeout: 3000,
    }).should("have.value", formatted);
  });

  it("Leave date as a empty and it should roll back", () => {
    cy.reload();
    const today = new Date();
    const formatted = today.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });

    cy.get(".react-datepicker__input-container > .w-full").then(($input) => {
      $input.val("");
      $input.trigger("blur");
    });

    cy.get(".react-datepicker__input-container > .w-full", {
      timeout: 3000,
    }).should("have.value", formatted);
  });

  it("Filter by category", () => {
    cy.reload();
    cy.get("#headlessui-combobox-input-«r3»")
      .click()
      .should("be.visible")
      .clear()
      .type("Work")
      .and("have.value", "Work");
    //only the works should be shown but its not showing....
  });
  it("Filter by All", () => {
    cy.reload();
    cy.get("#headlessui-combobox-input-«r3»")
      .click()
      .should("be.visible")
      .clear()
      .type("All")
      .and("have.value", "All");
    //all the tasks has to be shown and it is showing
  });
  it("Sort by a due date ascending", () => {
    addTask("ABCD", "Work", "Medium", "07/23/2025");
    addTask("Buggy App", "Work", "Medium", "07/21/2025");

    cy.get(":nth-child(3) > .w-full")
      .select("DueDate")
      .then(() => {
        cy.get(":nth-child(4) > .w-full").select("Ascending");
      })
      .then(() => {
        cy.get(".text-sm").should("contain", "Due: 7/21/2025");
      })
      .then(() => {
        cy.get(":nth-child(2) > .items-center > div > .text-sm").should(
          "contain",
          "Due: 7/23/2025"
        );
      });
  });

  it("Sort by a due date descending", () => {
    addTask("ABCD", "Work", "Low", "07/23/2025");
    addTask("Buggy App", "Work", "Low", "07/21/2025");

    cy.get(":nth-child(3) > .w-full")
      .select("DueDate")
      .then(() => {
        cy.get(":nth-child(4) > .w-full").select("Descending");
      })
      .then(() => {
        cy.get(".text-sm").should("contain", "Due: 7/23/2025");
      })
      .then(() => {
        cy.get(":nth-child(2) > .items-center > div > .text-sm").should(
          "contain",
          "Due: 7/21/2025"
        );
      });
  });

  it("Toggle darkmode on/off", () => {
    cy.get(".flex > .p-2")
      .should("be.visible")
      .and("be.enabled")
      .and("have.text", "Toggle Dark Mode")
      .click();

    cy.get(".bg-white")
      .should("have.css", "background-color")
      .then((bg) => {
        expect(bg).not.to.equal("rgb(255, 255, 255)");
      });
    //background color keeps white and produced a ui difficulty for an end user
  });

  it("checking for a progress bar with a 0 task been inserted", () => {
    cy.get(".max-w-4xl > :nth-child(1) > .w-full")
      .should("be.visible")
      .and("have.text", "0%");
  });
  it("checking for a progress bar with a 1 task been inserted", () => {
    cy.get(".max-w-4xl > :nth-child(1) > .w-full")
      .should("be.visible")
      .and("have.text", "0%")
      .then(() => {
        addTask("Buggy App", "Work", "Low", "07/21/2025");
      })
      .then(() => {
        cy.get(".mr-2").check().should("be.checked");
      })
      .then(() => {
        cy.get(".bg-blue-600").should("be.visible").and("contain", "25%");
      });
  });

  it("checking for a progress bar with a 2 task been inserted but 1 to be marked", () => {
    cy.get(".max-w-4xl > :nth-child(1) > .w-full")
      .should("be.visible")
      .and("have.text", "0%")
      .then(() => {
        addTask("Buggy App", "Work", "Low", "07/21/2025");
        addTask("ABCD", "Work", "Low", "07/23/2025");
      })
      .then(() => {
        cy.get(":nth-child(1) > .items-center > .mr-2")
          .check()
          .should("be.checked");
      })
      .then(() => {
        cy.get(".bg-blue-600").should("be.visible").and("contain", "25%");
      });
  });
});