export function formatDate(value) {
    let date = new Date(value);
    const day = date.toLocaleString('es-MX', { day: '2-digit' });
    const month = date.toLocaleString('es-MX', { month: 'long' });
    const year = date.toLocaleString('es-MX', { year: 'numeric' });
    return `${day} de ${month.charAt(0).toUpperCase() + month.slice(1)} del ${year}`;
}

export function compareAndUpdateDate(createdAt, updatedAt) {
    const createdAtDate = new Date(createdAt);
    const updatedAtDate = new Date(updatedAt);

    const created = createdAtDate.setMilliseconds(0);
    const updated = updatedAtDate.setMilliseconds(0);

    return created === updated ? "Sin Completar" : formatDate(updated);
}