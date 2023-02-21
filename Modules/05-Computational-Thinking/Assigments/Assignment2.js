function perimeter(shape, unitValue) {
    result = shape === "s" ? 4*unitValue : shape === "c" ? 6.28*unitValue : false
    console.log(result)
}

perimeter("s", 7);
perimeter("c", 4);
perimeter("c", 9);
