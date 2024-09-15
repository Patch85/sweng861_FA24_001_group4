# Architecture Diagrams

This directory contains all the architecture diagrams for the project, created using PlantUML. Follow the steps below to set up your environment for viewing and editing these diagrams.

## 1. Installing PlantUML in VS Code

To work with PlantUML files (`.puml`), you need to install the PlantUML extension in VS Code.

### Steps:
1. **Open VS Code**.
2. Go to the **Extensions** panel (or press `Ctrl+Shift+X`).
3. Search for **"PlantUML"**.
4. Select the **PlantUML** extension by **jebbs** and click **Install**.

## 2. Installing Dependencies (Java and Graphviz)

PlantUML requires **Java** and **Graphviz** to render diagrams. Below are the installation steps for each platform.

### Windows

#### Install Java:
1. Download and install the latest JDK from [here](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) or install OpenJDK from [here](https://adoptopenjdk.net/).
2. After installation, verify that Java is installed by running:
    ```bash
    java -version
    ```

#### Install Graphviz:
1. Download Graphviz for Windows from [here](https://graphviz.gitlab.io/_pages/Download/Download_windows.html).
2. Install Graphviz and ensure the **Add Graphviz to the system PATH** option is selected during installation.
3. Verify the installation by running:
    ```bash
    dot -version
    ```

### macOS

#### Install Java:
1. Install Java via [Homebrew](https://brew.sh/) or directly from Oracle:
   - To install via Homebrew:
     ```bash
     brew install openjdk@11
     ```
   - If installed manually, you may need to set the JAVA_HOME variable:
     ```bash
     export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-11.jdk/Contents/Home
     ```

2. Verify Java installation:
    ```bash
    java -version
    ```

#### Install Graphviz:
1. Install Graphviz via Homebrew:
    ```bash
    brew install graphviz
    ```
2. Verify the installation:
    ```bash
    dot -version
    ```

### Linux

#### Install Java:
1. Install OpenJDK using your package manager:
   - **Debian/Ubuntu**:
     ```bash
     sudo apt update
     sudo apt install openjdk-11-jdk
     ```
   - **Fedora**:
     ```bash
     sudo dnf install java-11-openjdk
     ```
   - **Arch Linux**:
     ```bash
     sudo pacman -S jdk11-openjdk
     ```

2. Verify Java installation:
    ```bash
    java -version
    ```

#### Install Graphviz:
1. Install Graphviz using your package manager:
   - **Debian/Ubuntu**:
     ```bash
     sudo apt install graphviz
     ```
   - **Fedora**:
     ```bash
     sudo dnf install graphviz
     ```
   - **Arch Linux**:
     ```bash
     sudo pacman -S graphviz
     ```

2. Verify the installation:
    ```bash
    dot -version

## 3. Using PlantUML in VS Code

Once the PlantUML extension and dependencies are installed, follow these steps to view and edit UML diagrams:

1. **Create or Open a `.puml` File**:
   - Open an existing `.puml` file or create a new one with the following structure:
     ```puml
     @startuml
     Alice -> Bob: Hello
     @enduml
     ```

2. **Preview the UML Diagram**:
   - To preview the diagram, right-click anywhere in the `.puml` file and select **"Preview Current Diagram"** or press `Alt + D`.
   - You can also click the small preview icon in the top right of the editor.

3. **Export UML Diagrams**:
   - You can export the diagram in various formats (e.g., PNG, SVG, etc.) by clicking **"Export Diagram"** in the PlantUML preview window or by using the `PlantUML: Export Current Diagram` command from the command palette (`Ctrl+Shift+P`).

## 4. Useful VS Code Shortcuts for PlantUML

- **Live Preview**: `Alt + D` – Opens a live preview of the UML diagram.
- **Export Diagram**: Use the command palette (`Ctrl+Shift+P`), then type `PlantUML: Export Current Diagram`.

---

Refer to the main project's [README](../README.md) for more information about the overall project structure and branching strategy.