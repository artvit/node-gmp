function main() {
  process.stdin.on('data', buffer => {
    process.stdout.write(buffer.reverse());
    process.stdout.write('\n\n');
  });
}

main();
