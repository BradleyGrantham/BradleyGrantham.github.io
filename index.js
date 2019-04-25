async function runExample() {
  // Create an ONNX inference session with default backend.
  const session = new onnx.InferenceSession();
  // Load an ONNX model. This model is Resnet50 that takes a 1*3*224*224 image and classifies it.
  await session.loadModel("./generator.onnx");

  const x = new Float32Array(1 * 1 * 100 * 1).fill(0.1);
  const y = new Float32Array(1 * 1 * 100 * 1).fill(0.2);
  const tensorX = new onnx.Tensor(x, 'float32', [1, 1, 100, 1]);
  const tensorY = new onnx.Tensor(y, 'float32', [1, 1, 100, 1]);

  // Run model with Tensor inputs and get the result by output name defined in model.
  const outputMap = await session.run(tensorX);
  const outputData = outputMap.get('skin');

  predictions.innerHTML = `Got an Tensor of size ${outputData.data.length} with all elements being ${outputData.data[0]}`;

}