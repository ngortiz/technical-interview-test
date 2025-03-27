const searchPeople = async (search, page = 1) => {
  try {
    const url = `${import.meta.env.VITE_API_URL}?page=${page}&search=${search}`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();

      return { success: true, people: data.results };
    }
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: error,
    };
  }
};

export { searchPeople };
