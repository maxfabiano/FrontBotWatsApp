class Example {
    body_text?: string[][];
    example?: string[];

    constructor(body_text?: string[][], example?: string[]) {
        this.body_text = body_text;
        this.example = example;
    }
}

// Definição dos botões usados no componente BUTTONS
class Button {
    type: string;
    text: string;
    url?: string;
    example?: string[];

    constructor(type: string, text: string, url?: string, example?: string[]) {
        this.type = type;
        this.text = text;
        this.url = url;
        this.example = example;
    }
}

// Definição dos componentes que formam o template
class Component {
    type: string;
    format?: string;
    text?: string;
    example?: Example;
    buttons?: Button[];

    constructor(
        type: string,
        format?: string,
        text?: string,
        example?: Example,
        buttons?: Button[]
    ) {
        this.type = type;
        this.format = format;
        this.text = text;
        this.example = example;
        this.buttons = buttons;
    }
}

// Definição do modelo para um template de mensagem individual
class MessageTemplate {
    id: string;
    name: string;
    parameter_format: string;
    components: Component[];
    language: string;
    status: string;
    category: string;
    library_template_name?: string;

    constructor(
        id: string,
        name: string,
        parameter_format: string,
        components: Component[],
        language: string,
        status: string,
        category: string,
        library_template_name?: string
    ) {
        this.id = id;
        this.name = name;
        this.parameter_format = parameter_format;
        this.components = components;
        this.language = language;
        this.status = status;
        this.category = category;
        this.library_template_name = library_template_name;
    }
}

// Definição do modelo de paginação
class Paging {
    cursors: { before: string; after: string };

    constructor(before: string, after: string) {
        this.cursors = { before, after };
    }
}

// Interface principal que representa a resposta da API
export interface Templatemain {
    data: MessageTemplate[];
    paging: Paging;
}