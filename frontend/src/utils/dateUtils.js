export const formatDateOfBirth = (dateOfBirthString) => {
    const dateOfBirth = new Date(dateOfBirthString);
    const day = dateOfBirth.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthIndex = dateOfBirth.getMonth();
    const year = dateOfBirth.getFullYear();

    return `${day} ${monthNames[monthIndex]} ${year}`;
};

