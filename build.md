**April 2024 --**

# <span style= "color:white;">Recipe Planner ([repo](www.asdasdasd))</span>

## <span style= "color:gold;">Specification</span>

Frontend: React JS
Backend: APPWRITE

```shell
npm run dev
```

## <span style= "color:gold;">Basic Setup</span>

- <span style= "color:white;">Vite Startup</span>

  ```shell
    $ npm create vite
  √ Project name: ... RecipePlanner
  √ Package name: ... recipeplanner (this was the default value)
  √ Select a framework: » React
  √ Select a variant: » JavaScript

    $ npm i
    $ npm run dev
  ```

- <span style= "color:white;">Cleanup</span>

  - Omit App.css
  - Omit react.svg
  - Patch Index.css (Dark-Mode Grid BG)
  - Blankify App.jsx

- <span style= "color:white;">File Organization</span>

  - **assets/**

    - ~~assets/fakeData.js~~ (deleted post Appwrite connection)
      ```js
      export const fakeData = [
      	{
      		$id: 1,
      		body: JSON.stringify(
      			'Resources:\n- Book: "You Don\'t Know JS: Scope & Closures" by Kyle Simpson.\n\n- Online Course: "JavaScript Patterns" on Udemy.\n\n- Articles:\n"Understanding JavaScript Closures" on Medium.\n\n"Mastering JavaScript Modules" on Dev.to.'
      		),
      		colors: JSON.stringify({
      			id: "color-purple",
      			colorHeader: "#FED0FD",
      			colorBody: "#FEE5FD",
      			colorText: "#18181A",
      		}),
      		position: JSON.stringify({ x: 505, y: 10 }),
      	},
      	{
      		$id: 2,
      		body: JSON.stringify(
      			'Resources:\n- Book: "You Don\'t Know JS: Scope & Closures" by Kyle Simpson.\n\n- Online Course: "JavaScript Patterns" on Udemy.\n\n- Articles:\n"Understanding JavaScript Closures" on Medium.\n\n"Mastering JavaScript Modules" on Dev.to.'
      		),
      		colors: JSON.stringify({
      			id: "color-blue",
      			colorHeader: "#9BD1DE",
      			colorBody: "#A6DCE9",
      			colorText: "#18181A",
      		}),
      		position: JSON.stringify({ x: 305, y: 110 }),
      	},
      	{
      		$id: 3,
      		body: JSON.stringify(
      			'Resources:\n- Book: "You Don\'t Know JS: Scope & Closures" by Kyle Simpson.\n\n- Online Course: "JavaScript Patterns" on Udemy.\n\n- Articles:\n"Understanding JavaScript Closures" on Medium.\n\n"Mastering JavaScript Modules" on Dev.to.'
      		),
      		colors: JSON.stringify({
      			id: "color-yellow",
      			colorHeader: "#FFEFBE",
      			colorBody: "#FFF5DF",
      			colorText: "#18181A",
      		}),
      		position: JSON.stringify({ x: 605, y: 500 }),
      	},
      ];
      ```

  - **components/**

    - components/NoteCard.jsx

      NoteCard.jsx for fakeData

      ```jsx
      const NoteCard = ({ note }) => {
      	const body = JSON.parse(note.body);

      	return <div>{body}</div>;
      };

      export default NoteCard;
      ```

  - **pages/**

    - pages/NotesPages.jsx
      NotesPage.jsx for fakeData

      ```jsx
      import { fakeData as notes } from "../assets/fakeData";
      import NoteCard from "../components/NoteCard";

      const NotesPage = () => {
      	return (
      		<div>
      			{notes.map((note) => (
      				<NoteCard key={note.$id} note={note} />
      			))}
      		</div>
      	);
      };

      export default NotesPage;
      ```

- <span style= "color:white;">Notes Styling</span>

  - patch card in index.css and apply within NoteCard.jsx className

- <span style= "color:white;">Card Styling</span>

  - inline styling in NoteCard
    - @Index.css add card body class
  - add header and trash icon (icons/Trash.jsx)
  - (absolutely) position cards
    - @index.css .card {position:absolute}
  - autogrow textarea (omit scrollbar)
    - @NoteCard
      - UseEffect
      - autoGrow
      - textAreaRef

## <span style= "color:gold;">Draggable Cards</span>

- Responsive Clicking

  - Animate position with UseState & setPosition
  - Establish mouseStartPos(.x & .y)
  - UseRef for initial position
  - Calculate position w/ e.clientX/Y

    - Add MouseUp/Down/Move events

- NotesPage Boundaries

  - utils/util.js

  - setNewOffset

  - zindex
    - header
    - textarea

## <span style= "color:gold;">Connect Backend</span>

[Appwrite](https://appwrite.io/?utm_term=mobile%20app%20development%20software&utm_campaign=Website+traffic-Search-July&utm_source=adwords&utm_medium=ppc&hsa_acc=8189217294&hsa_cam=21428501931&hsa_grp=166941975249&hsa_ad=704615028685&hsa_src=g&hsa_tgt=kwd-296336029370&hsa_kw=mobile%20app%20development%20software&hsa_mt=b&hsa_net=adwords&hsa_ver=3&gad_source=1&gclid=CjwKCAjwxY-3BhAuEiwAu7Y6s5fpP8QcUOU5lkYSa025_KnFWQ48vpNzwtfsLgBBVOWstH1KllLEkhoCD78QAvD_BwE)

Project (StickyNotes) ID- 66e4afa8000f4dc105bb

Create Project

- @Home create project

  - (name your project)

  Create DB

  - @Database tab

    - (name db and omit "database ID" to allow for auto-generate)

    Create Collection (single table within the project)

    - @within selected db, create Collection
      - add appropriate attributes (column)
        ```appwrite
        body + color + position
        ```

### <span style= "color:white;">Development-Back (User Groups)</span>

- @within collection tab (setting tab)
  - Add a role (in this case; all SUDOCRUD for all users)

### <span style= "color:white;">Development-Back (Establish Hostname)</span>

- Frontend (react) establish connection w/ Appwrite web SDK-> Appwrite DB
- @

### <span style= "color:white;">Development-Back (DB cnx)</span>

DB Cnx

<!-- Must set User group permission before cnx's ; Appwrite defaults to "access denied"  -->

- @within Porjects overview
  - add a platform (in this case, "web+")
    - name: (in this case, "MyApp")
    - Hostname: "localhost" (dont need to specify port number)
      - install via npm:
        ```shell
        npm i appwrite
        ```
        - if bundler: (skipped for now)
        ```jsx
        import { Client } from "appwrite";
        ```

### now we can host our appwrite data :)

## <span style= "color:gold;">Saving Changes</span>

- Position saving (on mouseUp)

  - saveData function setting NewPosition

- Content saving
  - Timer based (we want to update often but not every stroke)
  - saving status

```js
const [saving, setSaving] = useState(false);
const keyUpTimer = useRef(null);
```

add the saving status and timer @Notecard

```js
const handleKeyUp = async () => {
	//1 - Initial "saving" state
	setSaving(true);

	//2 - If we have a timer id, clear & queue next timer
	if (keyUpTimer.current) {
		clearTimeout(keyUpTimer.current);
	}

	//3 - saveData timer @ 2 seconds
	keyUpTimer.current = setTimeout(() => {
		saveData("body", textAreaRef.current.value);
	}, 2000);
};
```

asdasdasd

## <span style= "color:gold;">Deleting Notes</span>

- touch /components/DeleteButton.jsx

```jsx
import Trash from "../icons/Trash";
import { db } from "../appwrite/databases";

const DeleteButton = ({ noteId, setNotes }) => {
	const handleDelete = async (e) => {
		setNotes((prevState) => prevState.filter((note) => note.$id !== noteId));
	};

	return (
		<div onClick={handleDelete}>
			<Trash />
		</div>
	);
};
```

### <span style= "color:white;">ignore mousedown for delete (only trigger for header)</span>

```jsx
...
const mouseDown = (e) => { //? Calculating the current card position to the next//
        if (e.target.className === "card-header") { //? only for header will the save trigger
...
```

### <span style= "color:white;">updating db (delete functionality)</span>

- add within DeleteButton

```jsx
db.notes.delete(noteId);
```

## <span style= "color:rebeccapurple;">Context State</span>

Using API for acheiving global state to avoid 'prop drilling'

- we need to update our notes via Delete Component; pass down setNotes into NoteCard
  - context/NoteContext.jsx

```jsx
import { createContext } from "react";
import { useState, useEffect } from "react";
import Spinner from "../icons/Spinner";
import { db } from "../appwrite/databases";

export const NoteContext = createContext();

const NotesProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [notes, setNotes] = useState();

	useEffect(() => {
		init();
	}, []);

	const init = async () => {
		const response = await db.notes.list();
		setNotes(response.documents);
		setLoading(false);
	};

	const contextData = { notes, setNotes };

	return (
		<NoteContext.Provider value={contextData}>
			{loading ? (
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						height: "100vh",
					}}
				>
					<Spinner size="100" />
				</div>
			) : (
				children
			)}
		</NoteContext.Provider>
	);
};
export default NotesProvider;
```

### <span style= "color:rebeccapurple;">Create Context (create)</span>

- revisit

### <span style= "color:rebeccapurple;">Add Context Provider</span>

- revisit

### <span style= "color:rebeccapurple;">Delete DeleteButton</span>

- revisit

## <span style= "color:gold;">Creating Notes (create functionality component)</span>
### <span style= "color:white;">Icon- Plus</span>
Icon within Controls Panel
- src/icons/Plus.jsx
### <span style= "color:white;">Controls Panel</span>
this will be the ui component to Create note
- src/components/Controls.jsx
  - Append to NotePage.jsx
```jsx
<div>
    {notes.map((note) => (
       //...
    ))}
    <Controls />
</div>
```
  - Append CSS
### <span style= "color:white;">Color Selection</span>
- src/assets/colors.json
```json
[
    {
        "id": "color-yellow",
        "colorHeader": "#FFEFBE",
        "colorBody": "#FFF5DF",
        "colorText": "#18181A"
    },
    {
        "id": "color-green",
        "colorHeader": "#AFDA9F",
        "colorBody": "#BCDEAF",
        "colorText": "#18181A"
    },
    {
        "id": "color-blue",
        "colorHeader": "#9BD1DE",
        "colorBody": "#A6DCE9",
        "colorText": "#18181A"
    },
    {
        "id": "color-purple",
        "colorHeader": "#FED0FD",
        "colorBody": "#FEE5FD",
        "colorText": "#18181A"
    }
]
```

### <span style= "color:white;">Touch AddNote method</span>
Consider default values for new entries
- patchAddButton.jsx
```jsx
const startingPos = useRef(10);

const addNote = async () => {
        const payload = {
            position: JSON.stringify({
                x: startingPos.current,
                y: startingPos.current,
            }),
            colors: JSON.stringify(colors[0]),
        };
 
        const response = await db.notes.create(payload);
    };

    return (
        <div id="add-btn" onClick={addNote}>
            <Plus />
        </div>
    );
};
```
### <span style= "color:white;">update context state</span>
- Configure Add button for anti-overlap
```jsx
import { useContext } from "react";
import { NotesContext } from "../context/NotesContext";
 
const AddButton = () => {
    const { setNotes } = useContext(NotesContext);
    //...
    const addNote = async () => {
            const payload = {
                //..
            };
 
            startingPos.current += 10;
 
            const response = await db.notes.create(payload);
            setNotes((prevState) => [response, ...prevState]);
    };
```
### <span style= "color:white;">Setting NewNote Initial ZIndex</span>
- we want to establish the newly created instance to have highest zIndex among instances
  - @NoteCard
```jsx
useEffect(() => {
    autoGrow(textAreaRef);
    setZIndex(cardRef.current);
}, []);
```

## <span style= "color:gold;">Changing Colors</span>
Displaying @controls component, allow users to patch instance colors (via colors.json)

### <span style= "color:white;">Color Component</span>
Creating the component
- touch src/components/Color.jsx
``` jsx
const Color = ({ color }) => {
    const changeColor = () => {
        console.log("CHange color clicked:", color);
    };
 
    return (
        <div
            onClick={changeColor}
            className="color"
            style={{ backgroundColor: color.colorHeader }}
        ></div>
    );
};
```
Generate the JSON dependant Color Palette
@Controls.jsx
```jsx
//...
import colors from "../assets/colors.json";
import Color from "./Color";
 
const Controls = () => {
    return (
        <div id="controls">
            <AddButton />
            {colors.map((color) => (
                <Color key={color.id} color={color} />
            ))}
        </div>
    );
};
```
patch index
```css
.color {
    background-color: grey;
    height: 40px;
    width: 40px;
    border-radius: 50%;
 
    cursor: pointer;
    transition: 0.3s;
}
 
.color:hover {
    height: 45px;
    width: 45px;
}
```
### <span style= "color:white;">Selected Note</span>
- Invent a 'seleceted Note' @NotesContext
```jsx
const [selectedNote, setSelectedNote] = useState(null);
```
- @Card, import useContext and establish set selected note
```jsx
import { useContext } from "react";
import { NotesContext } from "../context/NoteContext";
...
const { setSelectedNote } = useContext(NotesContext);
```
-
### <span style= "color:white;">Handle Color Change</span>
- patch the changeColor @XxXxXXxxXxXxXx.jsx with updated try/catch
```jsx
const changeColor = () => {
    console.log("Selected color:", selectedNote);
 
    try {
        const currentNoteIndex = notes.findIndex(
            (note) => note.$id === selectedNote.$id
        );
 
        const updatedNote = {
            ...notes[currentNoteIndex],
            colors: JSON.stringify(color),
        };
 
        const newNotes = [...notes];
        newNotes[currentNoteIndex] = updatedNote;
        setNotes(newNotes);
 
        db.notes.update(selectedNote.$id, {
            colors: JSON.stringify(color),
        });
    } catch (error) {
        alert("You must select a note before changing colors");
    }
};
```








<br><br><br><br><br><br><br><br><br><br><br><br><br>
<br><br><br><br><br><br><br><br><br><br><br><br><br>

## <span style= "color:gold;">Deployment</span>

- [setup Appwrite WorkFlow](https://cloud.appwrite.io/console/organization-66d769ae0011d96c1cd1)

## <span style= "color:gold;">Resources</span>

- [Notes App Video](https://sticky-fcc.vercel.app/)

- [Documentation Preso](https://www.youtube.com/watch?v=yBThHM2pBbE&t=2449s)

## <span style= "color:gold;">Post Checklist √</span>

- Inspect:

  - functional stress-test
  - documentation
  - alt descriptions

- Future Patches:
  - Boundaries
  - Permissions

## <span style= "color:gold;">Minor takeaways</span>

- #App position relative for abs children.

## <span style= "color:gold;">Future Tasks</span>

- Restrict User group

- add bottom & right boundaries
