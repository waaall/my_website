---
title: Why Do We Know How Hot the Sun Is?
date: 2026-07-31
tags: [Physics, Optics, Cameras, Temperature Measurement]
summary: Starting from the temperature of the solar photosphere, this note discusses how light reveals temperature, what a camera actually records, and why a phone photo has a hard time telling us the true temperature of a candle flame.
draft: false
---

We often see a statement like this:

> The temperature at the surface of the Sun is about 5,500 °C.

But no one has ever taken a thermometer to the Sun. Where does this number come from?

The most intuitive answer might be: look at the light emitted by the Sun. Sunlight contains information about temperature. We measure its color, spectrum, and total energy, then infer the temperature from physical laws.

I have a whole list of questions:

- Why can light reveal temperature?
- The tables, clothes, and leaves we see every day also have colors. Why can't their colors tell us their temperatures directly?
- Are the RGB values recorded by a camera really the intensity of the light entering the lens?
- If a phone can infer temperature from sunlight, could we photograph a candle and calculate the flame's temperature?
- If one camera is not enough, could we obtain a three-dimensional temperature field by adding more cameras?

## What We See Is Probably Not Its Temperature

When we see a red table in a room, it is usually not because the table is hot enough to emit red light. Rather, external light reaches the tabletop, and some of that light is reflected into our eyes or into a camera:

<img class="theme-adaptive-diagram" src="/images/posts/how-light-reveals-temperature/reflected-light.svg" alt="Light from a lamp or the Sun reaches the tabletop; some visible light is reflected into the eye or camera, while the table's room-temperature thermal radiation lies mainly in the infrared band" />

Turn off the lamp, and the table still has a temperature, but it quickly becomes “invisible.”

This does not mean that the table has stopped emitting light (electromagnetic radiation). Any object above absolute zero produces thermal radiation. It is just that the thermal radiation from an object at room temperature is concentrated mainly in the infrared, which human eyes cannot see, and which an ordinary phone's visible-light camera does not normally record. The color we see on the tabletop during the day is determined mainly by reflected light, not by the table's own visible-light thermal radiation.

The same is true of red cups, green leaves, and blue clothes. Their colors tell us more about how the material selectively absorbs and reflects external light than about which object has the higher temperature.

Even light actively emitted by an object is not necessarily thermal radiation that can be mapped directly to temperature:

- LEDs emit light through electron–hole recombination in semiconductors;
- fluorescent materials can absorb light in one band and emit it in another;
- gas discharges produce spectral lines from particular atoms or molecules;
- excited radicals in combustion reactions can produce chemiluminescence.

So “an object emits light” and “an object emits light because of its temperature” are not the same thing.

More generally, the light received by a camera may include:

- thermal radiation from the object itself;
- non-thermal emission from atoms, molecules, or chemical reactions;
- ambient light reflected by the object;
- light transmitted through the object from behind it;
- light scattered into the current direction.

So why can we still infer temperature from sunlight?

## Blackbody: First Construct an Emitter Determined Only by Temperature

There are too many factors that affect light. The same beam of red light might come from:

- an object with a very high temperature but weak emissive capability;
- an object with a lower temperature that emits red light more readily;
- an object that is not particularly hot at all, but is reflecting red light from a lamp;
- an atom or molecule that emits only at particular wavelengths.

If the material, reflection, transmission, and emission mechanisms are all unknown, its temperature clearly cannot be determined merely from the fact that it “looks red.”

A common approach in physics is to first construct an ideal object that removes as many of these complications as possible. This ideal object is the **blackbody**. We study the ideal case first; to approach reality, we can then rank the factors that make real objects depart from it and consider them one by one.

An ideal blackbody absorbs all electromagnetic radiation that falls on it; it reflects and transmits nothing. When it is in thermal equilibrium, the spectrum of its thermal radiation is determined solely by its absolute temperature, regardless of whether it is made of iron, ceramic, or some other material.

The “black” in “blackbody” refers to its ability to absorb incoming radiation. It does not mean that a blackbody looks black at every temperature. A low-temperature blackbody may indeed look very dim to the human eye. As its temperature rises, it first emits infrared radiation invisible to us, then gradually glows dark red, orange-yellow, and eventually brightens to something close to white.

A perfectly ideal blackbody does not exist in the laboratory, but a temperature-controlled cavity with a small aperture can serve as a standard radiation source that comes very close. Light entering through the aperture undergoes multiple reflections inside the cavity and is absorbed. The radiation seen from outside through the aperture therefore approximates blackbody radiation determined uniquely by the cavity's temperature.

Conversely, if we can establish that an object is sufficiently close to a blackbody and accurately measure its radiation spectrum, we can infer its temperature from that spectrum. Real objects are usually not ideal blackbodies. Their thermal radiation at a particular wavelength is often approximated as:

$$
L_\lambda
\approx
\varepsilon_\lambda B_\lambda(T)
$$

where:

- $B_\lambda(T)$ is the spectral radiance of a blackbody at the same temperature and wavelength $\lambda$;
- $\varepsilon_\lambda$ is the object's emissivity at that wavelength;
- $L_\lambda$ is the spectral radiance actually emitted by the object.

If $\varepsilon_\lambda$ is unknown, it may be impossible to tell whether a lower brightness comes from a lower temperature or a lower emissivity. This is a recurring difficulty in essentially all radiometric temperature-measurement problems that follow.

## Planck's Law: Temperature Determines the Entire Spectrum

The spectral radiance of an ideal blackbody is given by Planck's law:

$$
B_\lambda(T)
=
\frac{2hc^2}{\lambda^5}
\frac{1}{
\exp\!\left(\dfrac{hc}{\lambda k_{\mathrm B}T}\right)-1
}
$$

where:

- $h$ is the Planck constant;
- $c$ is the speed of light in vacuum;
- $k_{\mathrm B}$ is the Boltzmann constant;
- $\lambda$ is the wavelength;
- $T$ is the absolute temperature in kelvins.

The formula looks somewhat complicated. But if we do not examine it too deeply and simply “believe” that it is correct, it means that **once the temperature is known, the amount of radiation a blackbody should emit at every wavelength is also determined.**

If we plot wavelength on the horizontal axis and spectral radiance on the vertical axis, different temperatures produce different continuous curves:

- the higher the temperature, the higher the entire curve;
- the higher the temperature, the farther the radiation peak shifts toward shorter wavelengths;
- even when the colors appear similar to the human eye, their quantitative distributions across wavelengths may be quite different.

The color perceived by the naked eye is a sensation produced by the visual system after highly compressing the spectrum. An RGB image similarly compresses the entire visible spectrum into values from three broad bands. Both discard a great deal of spectral detail.

But even if I do not examine Planck's law quantitatively, I cannot help asking: why do lower-temperature objects radiate mainly in the infrared, while the spectrum of the much hotter Sun peaks in the visible range? In other words, why does increasing temperature raise the characteristic frequency of the Planck curve and shorten its peak wavelength?

The exponential term in Planck's law contains the dimensionless ratio $h\nu/(k_{\mathrm B}T)$. At a given frequency $\nu$, increasing the temperature reduces this ratio, weakening the thermal-statistical suppression of high-frequency photons. The energy of a photon satisfies:

$$
E_{\mathrm{photon}}=h\nu
$$

In blackbody radiation, the average photon energy is proportional to temperature:

$$
\langle E_{\mathrm{photon}}\rangle\approx2.701k_{\mathrm B}T
$$

Therefore, the average energy and characteristic frequency of the emitted photons increase with temperature, and the spectral peak, when expressed as a function of wavelength, shifts toward shorter wavelengths. The exact position of the peak is also affected by the number of electromagnetic-field modes at each frequency, so it must be determined from the full Planck distribution.

<img class="theme-adaptive-diagram" src="/images/posts/how-light-reveals-temperature/planck-peak-shift.svg" alt="Normalized blackbody radiation curves at 1,000 kelvins, 2,000 kelvins, and 5,800 kelvins; the higher the temperature, the shorter the peak wavelength" />

_To compare the peak positions, each curve in the figure has been normalized separately. The figure shows the movement of the peak; it does not mean that the radiation intensities are equal at the three temperatures._

The movement of the peak in the figure can also be written as a simple quantitative relationship. This is Wien's displacement law, derived from Planck's law:

$$
\lambda_{\max}T=b
$$

where $b$ is the Wien displacement constant:

$$
b\approx2.898\times10^{-3}\ \mathrm{m\cdot K}
$$

For a blackbody at approximately $5800\ \mathrm K$, the peak spectral radiance, expressed as a function of wavelength, lies near $500\ \mathrm{nm}$—right in the visible range.

However, Wien's displacement law uses only the peak position. The Sun is not a perfect blackbody, and its spectrum also contains many absorption lines. Earth's atmosphere and the instruments themselves further alter the measured spectrum. A more reliable approach is to measure a more complete spectrum or the total radiative output, then fit it using instrument calibration and a physical model. It is worth noting, though, that the Sun is already very close to a blackbody; the non-blackbody or non-gray behavior of real objects is much more complicated.

### Stefan–Boltzmann Law: Temperature Determines Total Radiant Power

Integrating the Planck spectrum over all wavelengths gives the Stefan–Boltzmann law:

$$
M=\sigma T^4
$$

where:

- $M$ is the total radiant power emitted outward per unit area by an ideal blackbody;
- $\sigma$ is the Stefan–Boltzmann constant;
- $T$ is the absolute temperature.

This says that total radiant power increases with the fourth power of temperature. If the absolute temperature doubles, the total radiant power per unit area does not merely double; it increases by a factor of 16.

I have also seen some papers—without naming names—that equate a narrow-band radiative intensity, power, or brightness with the fourth power of temperature. That is nonsense. The fourth power in the Stefan–Boltzmann law describes the total emittance of an ideal blackbody integrated over the entire spectrum. An observation over a finite band should generally be obtained by integrating the Planck spectrum against the instrument response.

## What Does “The Sun's Surface Is About 5,500 °C” Actually Mean?

The Sun does not have a hard solid surface like Earth. The outline we see in visible light comes mainly from the **photosphere**, a layer in the solar atmosphere.

The continuous background of the solar spectrum is quite close to the spectrum of a blackbody at about $5700$–$5800\ \mathrm K$, but it is not exactly the same. The photosphere is not uniformly isothermal: it contains temperature gradients, granulation, and sunspots. Atoms and ions in the solar atmosphere also leave many absorption lines on top of the continuum.

The “surface temperature of the Sun” quoted in everyday contexts is usually close to the Sun's **effective temperature**. This does not mean that every point in the photosphere has exactly the same temperature. Rather, it means:

> Suppose there were an ideal blackbody with the same radius as the Sun. What temperature would it need to have to emit the same total radiant power as the Sun?

Given the Sun's total radiant power $L_\odot$ and the photospheric radius $R_\odot$, we can write:

$$
L_\odot
=
4\pi R_\odot^2\sigma T_{\mathrm{eff}}^4
$$

Conversely:

$$
T_{\mathrm{eff}}
=
\left(
\frac{L_\odot}{
4\pi R_\odot^2\sigma
}
\right)^{1/4}
$$

The nominal solar effective temperature adopted by the International Astronomical Union is $5772\ \mathrm K$, or approximately $5500\ ^\circ\mathrm C$. This number comes from the total solar irradiance, the distance to the Sun, the photospheric radius, and the Stefan–Boltzmann relation—not from the RGB value of a pixel in an ordinary color photograph.

The shape of the Sun's continuous spectrum is also broadly consistent with a blackbody curve near this temperature. The total radiative output and the spectral shape provide related, but not identical, pieces of evidence.

Let us leave the temperatures of the solar core and corona aside for now. That is another question.

## What Does a Camera “See”?

Once we understand blackbody radiation, it is easy to have the following idea:

> If the spectrum can reveal temperature, can't I just photograph a hot object and calculate its temperature from the pixel values?

That is rather naive. When taking a picture, a camera roughly goes through the following process:

<img class="theme-adaptive-diagram" src="/images/posts/how-light-reveals-temperature/camera-imaging-pipeline.en.svg" alt="A camera imaging pipeline in which scene radiation passes through the optical system, sensor, acquisition and conversion stages, and computational photography before becoming a RAW, JPEG, or HEIF image" />

Every step introduces distortion into the measurement data.

### RGB Channels

The R, G, and B channels of a color camera do not each receive light at just one precise wavelength. Each channel has a relatively broad spectral response curve, and the curves may overlap.

<img class="theme-adaptive-diagram" src="/images/posts/how-light-reveals-temperature/rgb-spectral-response.svg" alt="Illustration of typical normalized spectral responses for the red, green, and blue channels of a color camera; the three channels cover broad, overlapping bands" />

_This shows only typical curve shapes and does not represent the calibration data of any particular camera model. The actual curves vary with the sensor, color filter array, lens, and infrared-cut filter; the three channels in the figure have been normalized separately._

Ignoring some details, the raw digital value of the $c$th color channel can be roughly understood as:

$$
D_c
\propto
g\,t
\int
L_\lambda
\tau_{\mathrm{optics}}(\lambda)
S_c(\lambda)\,d\lambda
+d_c+n_c
$$

where:

- $L_\lambda$ is the spectral radiance from the scene in the direction of the camera;
- $\tau_{\mathrm{optics}}(\lambda)$ is the combined transmittance of the lens, filters, and window;
- $S_c(\lambda)$ is the spectral response of the corresponding color channel;
- $t$ is the exposure time;
- $g$ is the gain;
- $d_c$ represents additive terms such as black level and dark current;
- $n_c$ represents noise and quantization error.

Thus, simply changing the exposure time, ISO, aperture, or lens can change the digital value for the same light source. Conversely, the same RGB values can be produced by different combinations of spectra.

That is why “the R channel is 240, so what is the temperature?” is meaningless without additional information.

### A Real Camera Is Not a “Good” Measurement Camera

Phone cameras are designed to produce images that look clear, pleasing, and easy to share.

Auto-exposure prevents the image from becoming too dark or too bright. Auto white balance tries to make white objects still look white under different illumination. HDR combines multiple exposures. Tone mapping compresses highlights and lifts shadows. Local contrast enhancement and sharpening emphasize edges. Noise-reduction algorithms modify pixels based on the scene. Current systems may even use neural-network models to “fix” the image directly.

Gamma, or a standard transfer function, is not itself an “incorrect treatment.” It takes advantage of the fact that human vision is more sensitive to changes in dark regions, making better use of a limited number of code values. However, nonlinearly encoded digital values cannot be used directly as linear light intensity.

If we know exactly that an image uses a standard transfer characteristic such as sRGB or BT.709, we can apply the corresponding inverse transform to obtain the linear values defined by that standard. But this can recover only that part of the encoding; it cannot undo:

- auto-exposure and automatic gain;
- white balance and color correction;
- local tone mapping;
- multi-frame HDR compositing;
- saturation and clipping;
- noise reduction, sharpening, and lossy compression;
- undisclosed scene recognition and image-enhancement steps performed by the manufacturer.

Areas that have already been saturated to pure white are especially impossible to recover. How much light the sensor originally received may already have been lost during clipping.

### When Can a Picture Become Measurement Data?

1. **Is the camera response linear?**
   After black-level subtraction, are the digital values proportional to exposure? Over what range does this relationship hold?

2. **Are exposure and gain fixed and traceable?**
   Does the camera secretly change the exposure, ISO, white balance, or color gains from frame to frame?

3. **Have saturation, underexposure, or quantization losses occurred?**
   Pixels that are too bright or too dark may no longer contain enough information.

4. **What are the spectral responses of the individual channels?**
   Which wavelengths are the R, G, and B channels sensitive to? How much do the lens and filters modify them?

5. **Are the pixels mutually consistent?**
   Have dark current, fixed-pattern noise, vignetting, and pixel response nonuniformity been corrected using dark-field and flat-field calibration?

6. **Has the complete optical path been calibrated against a standard source?**
   Calibrating only the sensor is not enough. The lens, filters, window, and operating mode used in practice should all be included in the measurement chain.

7. **Has the calibration been validated over the actual operating range?**
   A correction relationship obtained at low temperature and short exposure cannot be assumed to remain valid at high temperature, long exposure, or a different sensor temperature.

There is also another class of problem, distinct from brightness: **geometric calibration**.

Radiometric calibration asks:

> What amount of light, and which wavelengths, does this pixel value represent?

Geometric calibration asks:

> Which direction in space does this pixel correspond to?

For a single camera observing a two-dimensional image, geometric errors may appear only as slight image distortion. When multiple cameras are used to recover three-dimensional structure, however, tiny errors in focal length, principal point, lens distortion, camera position, or camera orientation can prevent observations from different cameras from being correctly matched in space.

## Can a Phone Photograph the Temperature of a Candle Flame?

If all we have is a single JPEG shot in ordinary automatic mode, **we absolutely cannot reliably obtain the candle flame's absolute temperature.**

### “The Temperature of the Flame” Is Not Just One Number

A candle flame is not a solid object with a uniform temperature. Inside the flame there are:

- wax vapor that has not yet fully burned;
- oxygen and combustion products at different concentrations;
- thin layers where reactions are taking place;
- high-temperature gases;
- soot particles being formed, heated, and oxidized;
- temperatures and compositions that continually change as air flows through the flame.

The center, edge, lower blue region, and upper yellow region of the flame all have different temperatures, compositions, and emission mechanisms.

### Yellow and Blue Do Not Differ Only in Temperature

A large part of the visible light from the bright yellow region of a candle flame comes from soot particles heated to high temperatures. Soot can produce near-continuum thermal radiation, making it more suitable for blackbody or graybody approximations than many transparent gases.

But brightness still depends on more than temperature:

- soot concentration;
- particle size and optical properties;
- the wavelength dependence of emissivity;
- the length of the emitting region through which the light travels;
- absorption of radiation from the rear of the flame by the flame in front.

The blue region may contain chemiluminescence from excited species such as CH* and C₂*. In that case, a particular wavelength may be strong because a specific chemical reaction produces the corresponding emission band, not because that region happens to have a particular blackbody temperature.

Therefore, a change in color may come from a change in temperature, but it may also come from changes in the emitting species, particle concentration, or reaction process.

If it is established in advance that a particular region is dominated by continuous thermal radiation from hot soot, calibrated narrow-band or multispectral instruments can indeed be used to estimate the soot's radiative temperature.

## What Is Inside the Flame?

When measuring the surface of an opaque solid, under the geometrical-optics approximation, a camera ray usually lands on a particular location on the surface. As long as the air along the path is relatively transparent, the pixel mainly corresponds to the radiation emitted and reflected by that small surface region.

A flame, however, is not a two-dimensional surface but a three-dimensional medium with depth. A camera ray may pass successively through the near side of the flame, its middle, and its far side, and finally reach a wall or the surrounding environment behind it:

<img class="theme-adaptive-diagram" src="/images/posts/how-light-reveals-temperature/flame-line-of-sight.svg" alt="A camera ray passes through near, middle, and far regions of a flame; emission from each region, together with attenuated background light, enters the same camera pixel" />

Each segment may emit light of its own, and may also absorb light arriving from farther away. Thus, a pixel does not record a particular point in space. It records a combination of emission from the near region, middle-region emission attenuated by the near region, far-region emission attenuated by even more material, and background light attenuated along the entire path.

Ignoring scattering, this can be represented conceptually as:

$$
I_{\mathrm{camera}}
\approx
I_{\mathrm{background}}\,
\mathcal T(0,L)
+
\int_0^L
j(s)\,
\mathcal T(s\rightarrow\mathrm{camera})\,ds
$$

where:

- $j(s)$ represents the local emission contribution at position $s$ along the line of sight;
- $\mathcal T$ represents the transmittance from that position to the camera;
- the integral means that the same pixel mixes continuous contributions from the entire line of sight.

This is a **line-of-sight integral**. Even if the flame is completely transparent and absorbs almost nothing along the path, the pixel is still the sum of emission from every point along that path, not the temperature at one spatial point.

There is another paper claim I have seen—again, without naming names—that first takes the R/G signal accumulated along the line of sight, infers a two-dimensional apparent color temperature, and then assumes that the fourth power of this temperature is the linear projection of the local three-dimensional temperature to the fourth power in order to perform a three-dimensional inversion. That is nonsense.

### Optical Thickness

To describe how strongly a section of a medium absorbs light, we can define its optical thickness:

$$
\tau_\lambda
=
\int
\kappa_\lambda(s)\,ds
$$

where $\kappa_\lambda$ is the absorption coefficient at wavelength $\lambda$. Considering only direct light, the transmittance is approximately:

$$
\mathcal T_\lambda=e^{-\tau_\lambda}
$$

Optical thickness is not the same as ordinary geometric thickness. The same 10 cm distance may be nearly transparent to visible light but strongly absorbing at a particular infrared band. Optical thickness also changes when the composition of the medium or the particle concentration changes.

When the optical thickness is small:

$$
\tau_\lambda\ll1
$$

the medium is approximately transparent, and most light emitted from distant regions can reach the camera. Emission from different depths along the line of sight is then superimposed in the same pixel.

“Transparent” does not mean that we can see every depth separately. On the contrary, although the camera receives information from all depths, it adds that information into the same number, and the depth information is lost during projection.

Conversely, when the optical thickness is large:

$$
\tau_\lambda\gg1
$$

light from distant regions is strongly attenuated by the material in front. The camera mainly sees an effective radiating region close to the observer.

This region is sometimes informally described as a “surface,” but it is not a fixed surface in the solid-material sense. More precisely, it is an effective contribution region where the accumulated optical thickness is around 1. Changing the wavelength, viewing angle, composition, or particle concentration changes the location of this region.

This also gives us a deeper understanding of the Sun's photosphere. The Sun has no solid surface. We can see the photosphere because matter deeper inside the Sun is sufficiently opaque to visible light that photons from deep layers cannot escape directly, while the outer layers gradually become transparent. What we see is a region from which light can escape effectively, not a hard wall.

### Different Bands May See Different “Depths”

Because the absorption coefficient varies with wavelength, the red and green channels do not necessarily observe exactly the same physical region.

Under the ideal assumptions of a graybody, the same line of sight, and the same variation in emissivity, the ratio of radiance in two bands is highly sensitive to temperature and can reduce some of the effects of common brightness scale and emissivity. This is the basic idea behind two-color thermometry.

But the two color channels in an ordinary phone are broad and overlapping bands. They may also have different white-balance gains and color processing. The flame's emissivity and absorption need not be the same in the two bands. If the effective contribution regions of the two channels are different, then an R/G ratio is not even two observations of the same location or the same group of particles.

So an uncalibrated `R/G` value is not a temperature. Even if it has some correlation with temperature, that relationship must be validated using standard radiation sources at known temperatures, the complete spectral response of the camera, and the actual optical path.

## Can More Cameras Reconstruct a Three-Dimensional Temperature Field?

A single camera loses depth information along the viewing direction. So why not place several cameras at different viewing angles? The idea is reasonable. Since the lines of sight from different directions pass through different paths in the flame, multi-view observations can indeed add three-dimensional constraints.

Imagine a transparent box filled with glowing smoke. Each camera sees a two-dimensional projection from a different direction. Even if several projections are identical, there may still be more than one three-dimensional distribution inside the box that produces those images:

- a brighter region with a smaller volume;
- a dimmer region with a longer path;
- two regions arranged one behind the other and overlapping along the current viewing direction;
- regions with different temperatures and particle concentrations but similar final brightness.

If cameras can be installed only in a limited number of directions, rays may intersect heavily in some regions while other regions are barely observed effectively. Furnace observation ports, occlusion, and installation constraints make the problem even more pronounced.

More troublingly, the three-dimensional result may be extremely sensitive to small observational errors:

- one camera's pose is slightly off;
- one channel is mildly saturated;
- two cameras do not expose at exactly the same time;
- the window transmittance changes;
- image compression or noise alters a small number of pixels.

The two-dimensional images may look almost identical, while the reconstructed three-dimensional distribution changes dramatically.

This is the **ill-posedness** commonly discussed in inverse problems. It usually involves two layers:

1. Multiple different three-dimensional fields can produce very similar observations.
2. Small errors in the observations can be amplified into large three-dimensional errors by the inversion process.

In engineering, it is often necessary to add assumptions such as:

- temperature and emission intensity cannot be negative;
- the spatial distribution should not contain violent oscillations without supporting evidence;
- the flame at adjacent moments should not be completely unrelated;
- geometric or combustion constraints rule out hotspots in certain regions;
- known measurement points, spectrometers, or other sensors can provide additional constraints.

These constraints can stabilize the result, but they are ultimately an unavoidable concession to the uncertainty of the three-dimensional information.

## So, Can a Phone Measure the Temperature of a Candle?

Putting everything above together gives a layered answer.

### A Photo Taken in Automatic Mode

It can show the flame's shape, color, and relative brightness, but it cannot reliably provide its temperature.

The main reasons include:

- the emission mechanism is not unique;
- the phone's image-processing pipeline is opaque and may vary with the scene;
- RGB values are wide-band integrals, not a complete spectrum;
- soot concentration, emissivity, and absorption are unknown;
- a pixel mixes contributions from the entire line of sight;
- different regions of the flame have different temperatures.

### Fixed Parameters and RAW Data

These can reduce the uncertainty caused by automatic processing and allow us to study changes in relative brightness, color ratios, and operating conditions. But RAW data by itself is still not equivalent to a completed temperature measurement. Dark-field, flat-field, linearity, spectral-response, and complete optical-path calibration are still needed.

### Multi-Temperature Calibration of the Complete Camera System with a Blackbody Furnace

If the target region is dominated by continuous thermal radiation, the operating range matches the calibration range, the camera is not saturated, and the emissivity assumptions are acceptable, we can establish a mapping from pixels or color ratios to **apparent radiative temperature**.

But a blackbody furnace can demonstrate how the camera observes a blackbody. It does not automatically prove that a real candle flame is also a blackbody, nor does it eliminate the line-of-sight integration inside the flame.

### Multiple Bands, Multiple Views, and More Physical Constraints

With multiple spectral bands, viewing angles, and physical constraints, we can go further and estimate the soot's radiative temperature and the emission distribution in the flame, or even attempt to reconstruct a three-dimensional temperature-related field. But the meaning of the result, its dependence on the model, and its uncertainty must all be made explicit. No matter which approach we use, optical temperature measurement is an overall process consisting of the following chain:

<img class="theme-adaptive-diagram" src="/images/posts/how-light-reveals-temperature/temperature-inference-chain.en.svg" alt="Five-step evidence chain for optical temperature measurement: define the temperature, identify emission and propagation mechanisms, calibrate the camera and complete optical path, infer temperature from a model, and validate the result with independent data" />

The Sun is far away, while a candle is right in front of us. But distance is not what determines the difficulty of temperature measurement. What really determines whether we can “know the temperature” is whether the relationship between the observation and temperature is clear enough, and whether the entire chain of evidence can withstand validation.

## References

1. International Astronomical Union, [IAU 2015 Resolution B3: Recommended Nominal Conversion Constants for Selected Solar and Planetary Properties](https://www.iau.org/common/Uploaded%20files/IAUGA2015-Resolution-B3-recommended-nominal-conversion.pdf)
2. NASA Goddard Space Flight Center, [The Sun's Radiation](https://acd-ext.gsfc.nasa.gov/anonftp/acd/daac_ozone/Lecture4/Text/Lecture_4/sunrad.html)
3. National Bureau of Standards, [Self-Study Manual on Optical Radiation Measurements: Chapter 12, Blackbodies, Blackbody Radiation and Temperature Scales](https://nvlpubs.nist.gov/nistpubs/Legacy/TN/nbstechnicalnote910-8.pdf)
4. European Machine Vision Association, [EMVA Standard 1288: Standard for Characterization of Image Sensors and Cameras](https://www.emva.org/wp-content/uploads/EMVA1288Linear_4.0Release.pdf)
5. Burggraaff, O. et al., [Standardized spectral and radiometric calibration of consumer cameras](https://doi.org/10.1364/OE.27.019075), _Optics Express_, 2019.
6. ITU-R, [Recommendation BT.709: Parameter values for HDTV standards](https://www.itu.int/rec/R-REC-BT.709-6-201506-I/en)
7. Abu Saleh, A. A. et al., [Feasibility on equivalence ratio measurement via OH*, CH*, and C₂* chemiluminescence and study of soot emissions](https://doi.org/10.3389/ffuel.2023.1296502), _Frontiers in Fuels_, 2024.
8. NASA, [Eclipse Viewing Safety](https://science.nasa.gov/eclipses/safety/)
