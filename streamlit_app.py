import streamlit as st

st.set_page_config(page_title="Digitify", layout="wide")

st.title("🚀 Digitify")

st.write("My Streamlit app is live!")

if st.button("Click Me"):
    st.success("Button clicked!")
