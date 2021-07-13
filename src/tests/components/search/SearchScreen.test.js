import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";
import { SearchScreen } from "../../../components/search/SearchScreen";

describe("Pruebas en SearchScrean", () => {
    const history = {
        push: jest.fn(),
    };
    test("Debe de mostrarse correctamente con valores por defecto", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search"]}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(".alert-info").text().trim()).toBe("Search a Hero");
    });

    test("Debe mostrar a batman y el input del valor de querystring", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search?q=batman"]}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );

        expect(wrapper.find("input").prop("value")).toBe("batman");
        // expect(wrapper.find("HeroCard").exists()).toBe(true);
        expect(wrapper).toMatchSnapshot();
    });

    test("Debe mostrar un error si no encuentra el hero", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search?q=batman123"]}>
                <Route path="/search" component={SearchScreen} />
            </MemoryRouter>
        );

        expect(wrapper.find("HeroCard").exists()).toBe(false);
        expect(wrapper.find(".alert-danger").text().trim()).toBe(
            "There is no Hero with batman123"
        );
    });
    test("Debe de llamar el push del history", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/search?q=batman"]}>
                <Route
                    path="/search"
                    component={() => <SearchScreen history={history} />}
                />
            </MemoryRouter>
        );

        //simular el cambio en la caja de texto
        wrapper.find("input").simulate("change", {
            target: {
                name: "searchText",
                value: "batman",
            },
        });
        wrapper.find("form").prop("onSubmit")({
            preventDefault() {},
        });
        expect(history.push).toHaveBeenCalledWith("?q=batman");
    });
});
