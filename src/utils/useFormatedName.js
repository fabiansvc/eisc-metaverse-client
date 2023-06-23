const useFormattedName = (userName) => {
    return userName
        .toLowerCase()
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

export default useFormattedName;