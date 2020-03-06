import CountriesAPI from "../countries"

/* Test get all countries */
it('Expects all countries to be gotten', async () => {
    const response = await CountriesAPI.getAllCountries();
    // console.log(response);
    expect(response.status).toBe(200)
});

/* Test get unique country by name */
it('Expects unique country to be gotten by name', async () => {
    const response = await CountriesAPI.getUniqueCountry("Uganda");
    // console.log(response);
    expect(response.status).toBe(200)
});

/* Test search countries by name query */
it('Expects countries with matching name to be retrieved', async () => {
    const response = await CountriesAPI.searchCountries("united");
    // console.log(response);
    expect(response.status).toBe(200)
});