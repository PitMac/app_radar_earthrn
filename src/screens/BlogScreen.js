import React, { useEffect, useMemo, useState } from "react";
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { useTheme, Text, TextInput, Card, Avatar, IconButton, Button, Divider, Snackbar, Chip, Modal, Portal, Menu, Checkbox } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import CustomAppBar from "../components/CustomAppBar";
import GlobalIcon from "../components/GlobalIcon";

const initialPosts = [
  {
    id: "1",
    author: "Radar Earth",
    avatarColor: "#024280",
    createdAt: Date.now() - 1000 * 60 * 25,
    content: "Alerta: Sismo moderado reportado al sur de la región. Mantente informado.",
    likes: 12,
    comments: [
      { id: "c1", author: "Ana", text: "Gracias por avisar" },
      { id: "c2", author: "Luis", text: "Se sintió leve en mi zona." },
      { id: "c3", author: "María", text: "Pendiente de nuevas alertas." },
      { id: "c4", author: "Pedro", text: "No se sintió en mi ciudad." },
      { id: "c5", author: "Lucía", text: "Revisando mi kit de emergencia." },
      { id: "c6", author: "Carlos", text: "Gracias por la info!" },
      { id: "c7", author: "Jorge", text: "¿Hay riesgo de tsunami?" },
      { id: "c8", author: "Julia", text: "Avisa si hay réplica fuerte." },
      { id: "c9", author: "Marta", text: "Todo bien por ahora." },
      { id: "c10", author: "Nico", text: "Listo para evacuar si es necesario." },
    ],
    liked: false,
    pinned: true,
  },
  {
    id: "2",
    author: "Sistema",
    avatarColor: "#00897B",
    createdAt: Date.now() - 1000 * 60 * 60,
    content: "Consejo: Ten a mano tu kit de emergencia y un plan familiar.",
    likes: 33,
    comments: [],
    liked: true,
    pinned: false,
  },
  {
    id: "3",
    author: "Radar Earth",
    avatarColor: "#6A1B9A",
    createdAt: Date.now() - 1000 * 60 * 90,
    content: "Recordatorio: Revisa las rutas de evacuación de tu zona y compártelas con tu familia.",
    likes: 7,
    comments: [{ id: "c3", author: "María", text: "Hecho." }],
    liked: false,
    pinned: false,
  },
  {
    id: "4",
    author: "Equipo Técnico",
    avatarColor: "#1565C0",
    createdAt: Date.now() - 1000 * 60 * 5,
    content: "Mantenimiento programado hoy a las 23:00 UTC. El servicio podría verse intermitente.",
    likes: 2,
    comments: [],
    liked: false,
    pinned: false,
  },
  {
    id: "5",
    author: "Comunidad",
    avatarColor: "#2E7D32",
    createdAt: Date.now() - 1000 * 60 * 240,
    content: "Tip: Fija un punto de encuentro seguro con tus vecinos tras un sismo fuerte.",
    likes: 15,
    comments: [{ id: "c4", author: "Pablo", text: "Excelente idea." }],
    liked: true,
    pinned: false,
  },
  {
    id: "6",
    author: "Radar Earth",
    avatarColor: "#C62828",
    createdAt: Date.now() - 1000 * 60 * 10,
    content: "Se detectaron réplicas leves en las últimas 2 horas. Mantén la calma y revisa las alertas.",
    likes: 5,
    comments: [],
    liked: false,
    pinned: false,
  },
];

function timeAgo(ts) {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return `${diff}s`;
  const m = Math.floor(diff / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.floor(h / 24);
  return `${d}d`;
}

export default function BlogScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const [posts, setPosts] = useState(initialPosts);
  const [composerVisible, setComposerVisible] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [draft, setDraft] = useState("");
  const [snack, setSnack] = useState("");
  const [menuPostId, setMenuPostId] = useState(null);
  const [onboardingVisible, setOnboardingVisible] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [acceptedRules, setAcceptedRules] = useState(false);
  const [expandedComments, setExpandedComments] = useState({});
  const [hasAcceptedRules, setHasAcceptedRules] = useState(false);

  const placeholderColor = useMemo(() => theme.colors.onSurfaceVariant ?? theme.colors.outline, [theme]);

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return b.createdAt - a.createdAt;
    });
  }, [posts]);

  useEffect(() => {
    const loadFlag = async () => {
      try {
        const seen = await AsyncStorage.getItem("BLOG_ONBOARDING_SEEN_v1");
        if (seen) {
          setHasAcceptedRules(true);
        } else {
          setOnboardingVisible(true);
        }
      } catch (e) {
        setOnboardingVisible(true);
      }
    };
    loadFlag();
  }, []);

  const savePost = () => {
    if (!hasAcceptedRules) {
      setOnboardingStep(2);
      setOnboardingVisible(true);
      setSnack("Debes aceptar las normas para publicar");
      return;
    }
    const trimmed = draft.trim();
    if (!trimmed) return;
    if (editPostId) {
      setPosts((prev) => prev.map((p) => (p.id === editPostId ? { ...p, content: trimmed } : p)));
      setSnack("Publicación actualizada");
    } else {
      const newPost = {
        id: String(Date.now()),
        author: "Tú",
        avatarColor: theme.colors.primary,
        createdAt: Date.now(),
        content: trimmed,
        likes: 0,
        comments: [],
        liked: false,
        pinned: false,
      };
      setPosts([newPost, ...posts]);
      setSnack("Publicación creada");
    }
    setDraft("");
    setComposerVisible(false);
    setEditPostId(null);
  };

  const toggleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p
      )
    );
  };

  const addComment = (id, commentText) => {
    const c = commentText.trim();
    if (!c) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              comments: [...p.comments, { id: `${id}-${Date.now()}`, author: "Tú", text: c }],
            }
          : p
      )
    );
    setSnack("Comentario agregado");
  };

  const deletePost = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
    setSnack("Publicación eliminada");
    setMenuPostId(null);
  };

  const deleteComment = (postId, commentId) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId ? { ...p, comments: p.comments.filter((c) => c.id !== commentId) } : p
      )
    );
    setSnack("Comentario eliminado");
  };

  const renderItem = ({ item }) => (
    <Card
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: item.pinned ? theme.colors.primary : "transparent",
          borderWidth: item.pinned ? 1 : 0,
          ...(item.pinned
            ? {
                elevation: 4,
                shadowColor: theme.colors.primary,
                shadowOpacity: 0.18,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 3 },
              }
            : {}),
        },
      ]}
    >
      {item.pinned && <View style={[styles.pinnedBar, { backgroundColor: theme.colors.primary }]} />}
      <Card.Title
        title={item.author}
        subtitle={timeAgo(item.createdAt)}
        titleStyle={{ color: theme.colors.onSurface, fontWeight: "700" }}
        subtitleStyle={{ color: theme.colors.onSurfaceVariant }}
        left={(props) => (
          <Avatar.Text
            {...props}
            label={item.author[0]}
            color="#fff"
            style={[{ backgroundColor: item.avatarColor }, item.pinned && { borderWidth: 2, borderColor: theme.colors.primary }]}
          />
        )}
        right={() => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={{ color: theme.colors.onSurfaceVariant, marginRight: 4 }}>{item.likes}</Text>
            <IconButton
              icon={item.liked ? "heart" : "heart-outline"}
              iconColor={item.liked ? theme.colors.error : theme.colors.onSurfaceVariant}
              onPress={() => toggleLike(item.id)}
              size={22}
            />
            <Menu
              visible={menuPostId === item.id}
              onDismiss={() => setMenuPostId(null)}
              anchor={<IconButton icon="dots-vertical" onPress={() => setMenuPostId(item.id)} />}
            >
              <Menu.Item
                onPress={() => {
                  if (!hasAcceptedRules) {
                    setOnboardingStep(2);
                    setOnboardingVisible(true);
                    setMenuPostId(null);
                    setSnack("Debes aceptar las normas para publicar");
                    return;
                  }
                  setEditPostId(item.id);
                  setDraft(item.content);
                  setComposerVisible(true);
                  setMenuPostId(null);
                }}
                title="Editar publicación"
                leadingIcon="pencil-outline"
              />
              <Menu.Item onPress={() => deletePost(item.id)} title="Eliminar publicación" leadingIcon="trash-can-outline" />
            </Menu>
          </View>
        )}
      />
      <Card.Content>
        {item.pinned && (
          <View style={{ marginBottom: 6 }}>
            <Chip icon="pin" compact selectedColor={theme.colors.primary} mode="flat" style={{ alignSelf: "flex-start", backgroundColor: theme.colors.secondaryContainer }}>
              <Text>Fijado</Text>
            </Chip>
          </View>
        )}
        <Text style={{ color: theme.colors.onSurface, fontSize: 15 }}>{item.content}</Text>
        {item.comments.length > 0 && (
          <View style={styles.commentsBox}>
            {(expandedComments[item.id] ? item.comments : item.comments.slice(-2)).map((c) => (
              <View key={c.id} style={styles.commentRow}>
                <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                  <Avatar.Text size={24} label={c.author[0]} style={{ backgroundColor: theme.colors.primary }} color="#fff" />
                  <Text style={[styles.commentText, { color: theme.colors.onSurface }]}>
                    {c.author}: {c.text}
                  </Text>
                </View>
                <IconButton icon="trash-can-outline" onPress={() => deleteComment(item.id, c.id)} iconColor={theme.colors.onSurfaceVariant} size={18} />
              </View>
            ))}
            {item.comments.length > 2 && !expandedComments[item.id] && (
              <Text onPress={() => setExpandedComments((prev) => ({ ...prev, [item.id]: true }))} style={{ color: theme.colors.onSurfaceVariant }}>
                {`Posee ${item.comments.length - 2} comentarios más, ver más...`}
              </Text>
            )}
            {item.comments.length > 2 && expandedComments[item.id] && (
              <Text onPress={() => setExpandedComments((prev) => ({ ...prev, [item.id]: false }))} style={{ color: theme.colors.onSurfaceVariant }}>
                Ver menos...
              </Text>
            )}
          </View>
        )}
      </Card.Content>
      <Divider style={{ marginTop: 8 }} />
      <View style={styles.commentInputRow}>
        <TextInput
          mode="flat"
          value={item._draft ?? ""}
          onChangeText={(t) => setPosts((prev) => prev.map((p) => (p.id === item.id ? { ...p, _draft: t } : p)))}
          placeholder="Escribe un comentario"
          placeholderTextColor={placeholderColor}
          style={[styles.commentInput, { backgroundColor: "transparent", color: theme.colors.onSurface }]}
          underlineColor={theme.colors.outline}
          selectionColor={theme.colors.primary}
        />
        <IconButton icon="send" onPress={() => addComment(item.id, item._draft || "")} />
      </View>
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <CustomAppBar
        title="Blog App Earth"
        showDrawerButton
        onDrawerPress={() => navigation.openDrawer()}
        rightComponent={
          <TouchableOpacity
            onPress={() => {
              if (!hasAcceptedRules) {
                setOnboardingStep(2);
                setOnboardingVisible(true);
                setSnack("Debes aceptar las normas para publicar");
                return;
              }
              setEditPostId(null);
              setDraft("");
              setComposerVisible(true);
            }}
            style={{ marginRight: 8 }}
          >
            <GlobalIcon family="materialC" name="comment-plus" size={25} color="#FFFFFF" />
          </TouchableOpacity>
        }
      />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <FlatList contentContainerStyle={styles.listContent} data={sortedPosts} keyExtractor={(i) => i.id} renderItem={renderItem} ItemSeparatorComponent={() => <View style={{ height: 10 }} />} />
        <Portal>
          {/* Composer Modal */}
          <Modal visible={composerVisible} onDismiss={() => setComposerVisible(false)} contentContainerStyle={[styles.modalContent, { backgroundColor: theme.colors.surface }]}> 
            <Text style={{ color: theme.colors.onSurface, fontWeight: "bold", fontSize: 18, marginBottom: 10 }}>{editPostId ? "Editar publicación" : "Nueva publicación"}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}>
              <Avatar.Text size={36} label="T" style={{ backgroundColor: theme.colors.primary, marginRight: 8 }} color="#fff" />
              <Text style={{ color: theme.colors.onSurfaceVariant }}>Publicar como Tú</Text>
            </View>
            <TextInput mode="outlined" multiline numberOfLines={5} placeholder="Comparte una alerta o mensaje (sin fotos)" value={draft} onChangeText={setDraft} style={{ marginBottom: 12 }} />
            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <Button onPress={() => { setComposerVisible(false); setDraft(""); setEditPostId(null); }} style={{ marginRight: 6 }}>
                Cancelar
              </Button>
              <Button mode="contained" onPress={savePost}>
                {editPostId ? "Guardar" : "Publicar"}
              </Button>
            </View>
          </Modal>

          {/* Onboarding Modal */}
          <Modal visible={onboardingVisible} onDismiss={() => setOnboardingVisible(false)} contentContainerStyle={[styles.modalContent, { backgroundColor: theme.colors.surface }]}> 
            <Text style={{ color: theme.colors.onSurface, fontWeight: "bold", fontSize: 18, marginBottom: 8,textAlign:'center' }}>Bienvenido al Blog de la comunidad</Text>
            {onboardingStep === 0 && (
              <View>
                <Text style={{ color: theme.colors.onSurface, marginBottom: 8 }}>Comparte publicaciones con la comunidad.</Text>
                <Text style={{ color: theme.colors.onSurfaceVariant, marginBottom: 4 }}>• Informa sobre alertas o consejos.</Text>
                <Text style={{ color: theme.colors.onSurfaceVariant, marginBottom: 4 }}>• Mantén tus mensajes claros y útiles.</Text>
              </View>
            )}
            {onboardingStep === 1 && (
              <View>
                <Text style={{ color: theme.colors.onSurface, marginBottom: 8 }}>Comenta y reacciona a las publicaciones.</Text>
                <Text style={{ color: theme.colors.onSurfaceVariant, marginBottom: 4 }}>• Usa el corazón para reaccionar.</Text>
                <Text style={{ color: theme.colors.onSurfaceVariant, marginBottom: 4 }}>• Responde con respeto y empatía.</Text>
              </View>
            )}
            {onboardingStep === 2 && (
              <View>
                <Text style={{ color: theme.colors.onSurface, marginBottom: 8 }}>Normas y condiciones de uso:</Text>
                <Text style={{ color: theme.colors.onSurfaceVariant, marginBottom: 4 }}>• Respeto entre usuarios: no se permiten insultos ni acoso.</Text>
                <Text style={{ color: theme.colors.onSurfaceVariant, marginBottom: 4 }}>• Prohibido el spam y la desinformación.</Text>
                <Text style={{ color: theme.colors.onSurfaceVariant, marginBottom: 4 }}>• Moderamos el contenido para mantener la seguridad.</Text>
                <Text style={{ color: theme.colors.onSurfaceVariant, marginBottom: 8 }}>• Incumplir las normativas puede ser motivo de suspensión o bloqueo de cuenta.</Text>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", alignSelf: "center", width: "100%" }}>
                  <View style={{ borderWidth: 1, borderColor: theme.colors.primary, borderRadius: 6, padding: 1, marginRight: 8 }}>
                    <Checkbox
                      status={acceptedRules ? "checked" : "unchecked"}
                      onPress={() => setAcceptedRules((v) => !v)}
                      color={theme.colors.primary}
                      uncheckedColor={theme.colors.onSurfaceVariant}
                      style={{ transform: [{ scale: 0.85 }] }}
                    />
                  </View>
                  <Text style={{ color: theme.colors.onSurface }}>He leído y acepto las normas</Text>
                </View>
              </View>
            )}
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 12 }}>
              <Button onPress={() => (onboardingStep === 0 ? setOnboardingVisible(false) : setOnboardingStep((s) => Math.max(0, s - 1)))}>
                {onboardingStep === 0 ? "Omitir por ahora" : "Atrás"}
              </Button>
              {onboardingStep < 2 ? (
                <Button mode="contained" onPress={() => setOnboardingStep((s) => Math.min(2, s + 1))}>
                  Siguiente
                </Button>
              ) : (
                <Button
                  mode="contained"
                  disabled={!acceptedRules}
                  onPress={async () => {
                    try {
                      await AsyncStorage.setItem("BLOG_ONBOARDING_SEEN_v1", "1");
                    } catch {}
                    setHasAcceptedRules(true);
                    setOnboardingVisible(false);
                  }}
                >
                  Comenzar
                </Button>
              )}
            </View>
          </Modal>
        </Portal>

        <Snackbar visible={!!snack} onDismiss={() => setSnack("")} duration={2000}>
          {snack}
        </Snackbar>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 12,
    paddingBottom: 24,
  },
  card: {
    borderRadius: 14,
    overflow: "hidden",
  },
  commentsBox: {
    marginTop: 10,
    padding: 8,
    borderRadius: 10,
  },
  pinnedBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
  },
  commentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 6,
  },
  commentText: {
    marginLeft: 8,
    flex: 1,
  },
  commentInputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  commentInput: {
    flex: 1,
    marginHorizontal: 8,
  },
  modalContent: {
    width: "90%",
    alignSelf: "center",
    borderRadius: 16,
    padding: 16,
  },
});
