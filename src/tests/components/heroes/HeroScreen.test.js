import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";
import { HeroScreen } from "../../../components/heroes/HeroScreen";

describe("Pruebas en <HeroScreen />", () => {
    const history = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn(),
    };
    test("Debe de mostrar el componente Redirect si no hay argumentos en el URL", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero"]}>
                <HeroScreen history={history} />
            </MemoryRouter>
        );
        expect(wrapper.find("Redirect").exists()).toBe(true);
    });
    test("Debe de mostrar un heroe si el paramaetro existe y se encuentra ", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/marvel-captain"]}>
                <Route path="/hero/:heroeId" component={HeroScreen} />
            </MemoryRouter>
        );
        expect(wrapper.find(".row").exists()).toBe(true);
    });

    test("Debe (con el boton) regresar a la pantalla anterior con push", () => {
        const history = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn(),
        };

        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/marvel-captain"]}>
                <Route
                    path="/hero/:heroeId"
                    component={() => <HeroScreen history={history} />}
                />
            </MemoryRouter>
        );

        wrapper.find("button").prop("onClick")();
        expect(history.push).toHaveBeenCalledWith("/");
        expect(history.goBack).not.toHaveBeenCalled();
    });

    test("Debe (con el boton) regresar a la pantalla anterior con goback", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/marvel-captain"]}>
                <Route
                    path="/hero/:heroeId"
                    component={() => <HeroScreen history={history} />}
                />
            </MemoryRouter>
        );

        wrapper.find("button").prop("onClick")();
        // expect(history.push).not.toHaveBeenCalledWith("/");
        expect(history.push).toHaveBeenCalledTimes(0);
        expect(history.goBack).toHaveBeenCalled();
    });

    test("Debe llamar el Redirect si el heroe no existe", () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={["/hero/marvel-captain231321321"]}>
                <Route
                    path="/hero/:heroeId"
                    component={() => <HeroScreen history={history} />}
                />
            </MemoryRouter>
        );

        expect(wrapper.text()).toBe("");
    });
});
