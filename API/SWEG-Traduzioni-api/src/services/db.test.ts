import { getTenant, newTenant } from "./dbtest";


test('test put new tenant', async () => {

    await newTenant({
        name: "test",
        mainlang: "en",
        languages: ["en", "es"],
        users: ["pippo"]
    });
    const result = await getTenant("test");
    expect(result.name).toBe("test");
});